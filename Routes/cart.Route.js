const express = require("express");
const router = express.Router();
const cartController = require("../Controllers/cart.controller");

// Route to add a product to the cart
router.post("/add/:productId", cartController.addToCart);

// Route to get all cart items
router.get("/", cartController.getCartItems);

module.exports = router;
