const express = require("express");
const router = express.Router();
// const requireAuth = require("../Middlewares/authMiddleware");
const authController = require("../Controllers/authController");

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/users", authController.getAllUsers);
router.get("/users/:id", authController.getUserById);
router.patch("/users/:id", authController.updateUserById);
router.delete("/users/:id", authController.deleteUser);

module.exports = router;
