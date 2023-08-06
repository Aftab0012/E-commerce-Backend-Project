const express = require("express");
const router = express.Router();
const productsController = require("../Controllers/product.controller");

// Route to get all products
router.get("/", productsController.getAllProducts);

// Route to get products by category ID
router.get("/products/:categoryId", productsController.getProductsByCategory);

// Route to get a specific product by ID
router.get("/:productId", productsController.getProductById);

// Route to create a new product
router.post("/add", productsController.createProduct);

module.exports = router;
