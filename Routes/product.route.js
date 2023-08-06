// products.route.js
const express = require("express");
const router = express.Router();
const productsController = require("../Controllers/product.controller");

router.get("/", productsController.getAllProducts);
router.get("/products/:categoryId", productsController.getProductsByCategory);
router.get("/:productId", productsController.getProductById);
router.post("/add", productsController.createProduct);

module.exports = router;
