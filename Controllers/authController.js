// Required modules and models
const User = require("../Models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userValSchema = require("../Validations/userValidations");

/**
 * Register a new user.
 * @param {Object} req - Express request object containing user data in the body.
 * @param {Object} res - Express response object to send the response.
 * @returns {Object} - JSON response indicating success or failure.
 */
const registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Checking for Validations using Joi
    const { error } = userValSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Taking username and password and checking if user already exists or not
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    // Hashing password before storing
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(`Hashed Password: ${hashedPassword}`);

    // Creating newUser using mongoose model
    const newUser = await User.create({ username, password: hashedPassword });

    return res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ error: "Registration failed" });
  }
};

/**
 * Login a user.
 * @param {Object} req - Express request object containing user data in the body.
 * @param {Object} res - Express response object to send the response.
 * @returns {Object} - JSON response indicating success or failure.
 */
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign({ username }, process.env.SECRET_KEY, {
      expiresIn: "5h",
    });

    console.log("logged in user Data" + user);

    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(400).json({ error: "Login failed" });
  }
};

/**
 * Get all users.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object to send the response.
 * @returns {Object} - JSON response containing all users or an error message.
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(404).json({ error: "No users found" });
  }
};

/**
 * Get a user by their ID.
 * @param {Object} req - Express request object containing the user ID as a URL parameter.
 * @param {Object} res - Express response object to send the response.
 * @returns {Object} - JSON response containing the user data or an error message.
 */
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Update a user by their ID.
 * @param {Object} req - Express request object containing the user ID as a URL parameter and updated user data in the body.
 * @param {Object} res - Express response object to send the response.
 * @returns {Object} - JSON response indicating success or failure.
 */
const updateUserById = async (req, res) => {
  try {
    const updatedUserData = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedUserData) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ updatedUserData });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update user" });
  }
};

/**
 * Delete a user by their ID.
 * @param {Object} req - Express request object containing the user ID as a URL parameter.
 * @param {Object} res - Express response object to send the response.
 * @returns {Object} - JSON response indicating success or failure.
 */
const deleteUser = async (req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  console.log("deleted", deletedUser);
  if (!deletedUser) {
    return res.status(500).json({ message: "User not found" });
  }

  return res.status(200).json({ deletedUser });
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUser,
};
