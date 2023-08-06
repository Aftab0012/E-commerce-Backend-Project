// categories.controller.js
const Category = require("../Models/category.model");

async function getCategories(req, res) {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (error) {
    res.status(400).json({ message: "No categories listed Yet" });
  }
}

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
