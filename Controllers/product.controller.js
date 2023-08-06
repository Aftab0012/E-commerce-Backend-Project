// products.controller.js
const Product = require("../Models/product.model");

async function getAllProducts(req, res) {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(404).json({ message: "Product not found" });
  }
}

async function getProductsByCategory(req, res) {
  const categoryId = req.params.categoryId;
  try {
    const products = await Product.find({ categoryId });
    res.json(products);
  } catch (error) {
    res.status(404).json({ message: "Product not found" });
  }
}

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
