// products.controller.js
const Product = require("../Models/product.model");

/**
 * Get all products from the database.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object to send the response.
 * @returns {Object} - JSON response containing all products or an error message.
 */
async function getAllProducts(req, res) {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(404).json({ message: "Product not found" });
  }
}

/**
 * Get products by category ID from the database.
 *
 * @param {Object} req - Express request object containing the category ID as a URL parameter.
 * @param {Object} res - Express response object to send the response.
 * @returns {Object} - JSON response containing products of the specified category or an error message.
 */
async function getProductsByCategory(req, res) {
  const categoryId = req.params.categoryId;
  try {
    const products = await Product.find({ categoryId });
    res.json(products);
  } catch (error) {
    res.status(404).json({ message: "Product not found" });
  }
}

/**
 * Get a product by its ID from the database.
 *
 * @param {Object} req - Express request object containing the product ID as a URL parameter.
 * @param {Object} res - Express response object to send the response.
 * @returns {Object} - JSON response containing the product data or an error message.
 */
async function getProductById(req, res) {
  const productId = req.params.productId;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * Create a new product.
 *
 * @param {Object} req - Express request object containing product data in the body.
 * @param {Object} res - Express response object to send the response.
 * @returns {Object} - JSON response containing the created product or an error message.
 */
async function createProduct(req, res) {
  const { title, price, description, availability, categoryId } = req.body;

  try {
    // Create a new product
    const product = await Product.create({
      title,
      price,
      description,
      availability,
      categoryId,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: "Failed to create product" });
  }
}

module.exports = {
  getProductsByCategory,
  getProductById,
  createProduct,
  getAllProducts,
};
