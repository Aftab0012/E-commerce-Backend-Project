const express = require("express");
const router = express.Router();
// const requireAuth = require("../Middlewares/authMiddleware");
const categoryController = require("../Controllers/category.controller");

router.get("/", categoryController.getCategories);
router.post("/add", categoryController.createCategory);

module.exports = router;
