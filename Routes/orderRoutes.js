const express = require("express");
const router = express.Router();
const orderController = require("../Controllers/ordersController");

//route to place order
router.post("/placeorder", orderController.placeOrder);

//route to get order History
router.get("/orderhistory", orderController.getOrderHistory);

//route to get order details
router.get("/orderdetails/:id", orderController.getOrderDetails);

module.exports = router;
