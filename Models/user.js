const mongoose = require("mongoose");

// Define the user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cartId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart", // Reference to the Cart model
  },
});

// Create the User model using the defined schema
const User = mongoose.model("User", userSchema);

module.exports = User;
