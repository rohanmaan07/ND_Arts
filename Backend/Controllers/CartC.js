
const CartService = require("../Services/CartS");

const findUserCart = async (req, res) => {
    try {
        const userId = req.user?._id || req.query.userId;   // ✅ Fix

        if (!userId) {
            return res.status(400).json({ error: "userId is required" });
        }

        const cart = await CartService.findUserCart(userId);
        return res.status(200).send(cart);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

const addItemToCart = async (req, res) => {
  try {
    const userId = req.user?._id || req.body.userId;
    
    console.log("🛒 Add to cart DEBUG:");
    console.log("userId:", userId);
    console.log("req.body:", req.body);


    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }
    const cartItem = await CartService.addCartItem(userId, req.body);
    return res.status(200).send(cartItem);
  } catch (error) {
    console.error("Cart Add Error:", error);
    return res.status(500).send({ error: error.message });
  }
};


const clearCart = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }
    await CartService.clearUserCart(userId);
    return res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error) {
    console.error("Error clearing cart:", error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
    findUserCart,
    addItemToCart,
    clearCart
};
