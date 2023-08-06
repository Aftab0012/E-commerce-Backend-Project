const express = require("express");
const router = express.Router();
// const requireAuth = require("../Middlewares/authMiddleware");
const categoryController = require("../Controllers/category.controller");

// Route to get all categories
router.get("/", categoryController.getCategories);

// Route to create a new category
router.post("/add", categoryController.createCategory);

module.exports = router;
