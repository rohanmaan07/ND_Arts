const mongoose = require("mongoose");
const CartItemService = require("../Services/CartItemS");

// Update Cart Item Controller
const updateCartItem = async (req, res) => {
  const { _id: userId } = req.user;
  const { id: cartItemId } = req.params;
  const { quantity } = req.body;

  try {
    const updatedCartItem = await CartItemService.updateCartItem(userId, cartItemId, { quantity });
    res.status(200).send(updatedCartItem);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Remove Cart Item Controller
const removeCartItem = async (req, res) => {
  const { _id: userId } = req.user;
  const { id: cartItemId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(cartItemId)) {
    return res.status(400).send({ error: "Invalid cart item ID" });
  }

  try {
    await CartItemService.removeCartItem(userId, cartItemId);
    res.status(200).send({ message: "Cart item removed successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = { updateCartItem, removeCartItem };
