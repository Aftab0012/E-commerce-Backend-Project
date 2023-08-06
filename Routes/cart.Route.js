// cart.route.js
const express = require("express");
const router = express.Router();
const cartController = require("../Controllers/cart.controller");

router.post("/add/:productId", cartController.addToCart);
router.get("/", cartController.getCartItems);

module.exports = router;
