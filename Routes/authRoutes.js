const express = require("express");
const router = express.Router();
// const requireAuth = require("../Middlewares/authMiddleware");
const authController = require("../Controllers/authController");

// Route to register a new user
router.post("/register", authController.registerUser);

// Route to log in a user
router.post("/login", authController.loginUser);

// Route to get all users
router.get("/users", authController.getAllUsers);

// Route to get a specific user by ID
router.get("/users/:id", authController.getUserById);

// Route to update a user by ID
router.patch("/users/:id", authController.updateUserById);

// Route to delete a user by ID
router.delete("/users/:id", authController.deleteUser);

module.exports = router;
