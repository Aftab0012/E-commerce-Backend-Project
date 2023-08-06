// categories.controller.js
const Category = require("../Models/category.model");

/**
 * Get all categories from the database.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object to send the response.
 * @returns {Object} - JSON response containing all categories or an error message.
 */
async function getCategories(req, res) {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (error) {
    res.status(400).json({ message: "No categories listed yet" });
  }
}

/**
 * Create a new category.
 *
 * @param {Object} req - Express request object containing the category name in the body.
 * @param {Object} res - Express response object to send the response.
 * @returns {Object} - JSON response containing the created category or an error message.
 */
async function createCategory(req, res) {
  const { name } = req.body;

  try {
    // Create a new category
    const category = await Category.create({ name });

    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: "Failed to create category" });
  }
}

module.exports = {
  getCategories,
  createCategory,
};
