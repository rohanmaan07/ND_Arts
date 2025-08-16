const mongoose=require("mongoose");
const Cart = require("../Models/cart");
const CartItem = require("../Models/cartItems");
const Product = require("../Models/product");

async function createCart(user) {
  try {
    const cart = new Cart({ user });
    const createCart = await cart.save();
    return createCart;
  } catch (e) {
    throw new Error(e.message);
  }
}

async function findUserCart(userId) {
  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      throw new Error("Cart not found for this user.");
    }

    // Populate cartItems with products
    const cartItems = await CartItem.find({ cart: cart._id }).populate("product");
console.log("Cart Items with populated product:", cartItems);
    // Calculate totals
    let totalPrice = 0;
    let totalDiscountedPrice = 0;
    let totalItem = 0;

    for (let item of cartItems) {
      totalPrice += item.price;
      totalDiscountedPrice += item.discountedPrice;
      totalItem += item.quantity;
    }

    // Return a **custom object** instead of modifying original `cart`
    return {
      _id: cart._id,
      user: cart.user,
      cartItems: cartItems, // ✅ Populated items returned separately
      totalPrice,
      totalDiscountedPrice,
      totalItem,
      discount: totalPrice - totalDiscountedPrice
    };

  } catch (error) {
    console.error("Error in findUserCart:", error);
    throw new Error(`Find user cart failed: ${error.message}`);
  }
}


async function addCartItem(userId, req) {
  try {
    let cart = await Cart.findOne({ user: userId });
    if (!cart) cart = await createCart(userId);

    // Validate product ID
    if (!mongoose.Types.ObjectId.isValid(req.productId)) {
      throw new Error("Invalid productId");
    }
    const product = await Product.findById(req.productId);
    if (!product) throw new Error("Product not found.");

    // Defensive quantity
    const quantity = typeof req.quantity === "number" && req.quantity > 0 ? req.quantity : 1;

    const isPresent = await CartItem.findOne({
      cart: cart._id,
      product: product._id,
      userId,
      size: req.size
    });

    if (isPresent) {
      isPresent.quantity += quantity;
      await isPresent.save();
      return { success: true, message: "Item quantity updated in cart" };
    }

    const cartItem = new CartItem({
      product: product._id,
      cart: cart._id,
      quantity,
      userId,
      price: product.price,
      discountedPrice: product.discountedPrice,
      size: req.size
    });
    const createdCartItem = await cartItem.save();
    cart.cartItems.push(createdCartItem._id);
    await cart.save();

    return { success: true, message: "Item added to cart" };
  } catch (error) {
    console.error("Error in addCartItem:", error);
    throw error;
  }
}
async function clearUserCart(userId) {
  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      // Agar cart nahi hai, kuch karne ki zarurat nahi
      return;
    }

    // Cart ke sare items delete karo
    await CartItem.deleteMany({ cart: cart._id });

    // Cart ke items array ko empty karo
    cart.cartItems = [];
    await cart.save();

  } catch (error) {
    console.error("Error in clearUserCart:", error);
    throw new Error(error.message);
  }
}


module.exports = { createCart, findUserCart, addCartItem ,  clearUserCart};
