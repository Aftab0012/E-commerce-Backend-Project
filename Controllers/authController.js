const User = require("../Models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userValSchema = require("../Validations/userValidations");

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

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(404).json({ error: "no users found" });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: "internal server error" });
  }
};

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

    if (!updateUserById) {
      return res.status(0).json({ message: "user not found" });
    }

    return res.status(200).json({ updatedUserData });
  } catch (error) {
    return res.status(500).json({ message: "updated user failed" });
  }
};

const deleteUser = async (req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  console.log("deleteted", deletedUser);
  if (!deletedUser) {
    return res.status(500).json({ message: "User not found" });
  }

  return res.status(200).json({ deleteUser });
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUser,
};
