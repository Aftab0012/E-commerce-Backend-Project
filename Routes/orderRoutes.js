const express = require("express");
const router = express.Router();
const orderController = require("../Controllers/ordersController");

router.post("/placeorder", orderController.placeOrder);

module.exports = router;
