const UserCart = require("../Models/userCart.model");
// const User = require("../Models/user");

/**
 * Add a product to the user's cart or update its quantity if already added.
 *
 * @param {Object} req - Express request object containing the product ID as a URL parameter and user ID from authentication.
 * @param {Object} res - Express response object to send the response.
 * @returns {Object} - JSON response containing the updated user cart or an error message.
 */
async function addToCart(req, res) {
  const productId = req.params.productId;
  const userId = req.user.id;

  try {
    // Find the user cart based on the user ID
    const userCart = await UserCart.findOne({ user: userId });

    if (!userCart) {
      // If the user cart does not exist, create a new cart for the user
      const newCart = new UserCart({
        user: userId,
        cart: [{ productId, quantity: 1 }],
      });
      await newCart.save();
      return res.json(newCart.cart);
    }

    // Check if the product already exists in the cart
    const cartItemIndex = userCart.cart.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (cartItemIndex !== -1) {
      // If the product already exists, increase the quantity
      userCart.cart[cartItemIndex].quantity += 1;
    } else {
      // If the product is not in the cart, add it with quantity 1
      userCart.cart.push({ productId, quantity: 1 });
    }

    console.log(userCart);
    await userCart.save();
    res.json(userCart.cart);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * Get all cart items from the database.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object to send the response.
 * @returns {Object} - JSON response containing all cart items or an error message.
 */
async function getCartItems(req, res) {
  const allCartItems = await UserCart.find({});
  return res.json(allCartItems);
}

module.exports = {
  addToCart,
  getCartItems,
};
