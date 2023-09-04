const UserCart = require("../Models/userCart.model");
const Order = require("../Models/order.model");

/**
 * Place an order with products from the user's cart.
 *
 * @param {Object} req - Express request object containing user ID from authentication.
 * @param {Object} res - Express response object to send the response.
 * @returns {Object} - JSON response confirming the order placement or an error message.
 */
async function placeOrder(req, res) {
  const userId = req.user.id;

  try {
    // Find the user cart based on the user ID
    const userCart = await UserCart.findOne({ user: userId });

    if (!userCart || userCart.cart.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Create a new order based on the cart items
    const order = new Order({
      user: userId,
      products: userCart.cart,
    });

    await order.save();

    // Clear the user's cart after placing the order
    userCart.cart = [];
    await userCart.save();

    res.json({ message: "Order placed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  placeOrder,
};
