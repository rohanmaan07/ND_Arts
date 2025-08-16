const CartItem = require("../Models/cartItems");

const updateCartItem = async (userId, cartItemId, cartItemData) => {
  const item = await CartItem.findById(cartItemId).populate("product");

  if (!item) throw new Error("Cart item not found");
  if (!item.product) throw new Error("Product not found for this cart item");

  if (item.userId.toString() !== userId.toString()) {
    throw new Error("You can't update another user's cart item");
  }

  item.quantity = cartItemData.quantity;
  item.price = item.quantity * item.product.price;
  item.discountedPrice = item.quantity * item.product.discountedPrice;

  return await item.save();
};

const removeCartItem = async (userId, cartItemId) => {
  const item = await CartItem.findById(cartItemId);

  if (!item) throw new Error("Cart item not found");
  if (item.userId.toString() !== userId.toString()) {
    throw new Error("You can't delete another user's cart item");
  }

  await item.deleteOne();
};

module.exports = { updateCartItem, removeCartItem };
