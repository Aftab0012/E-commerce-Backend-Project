const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cartId: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" }, // Reference to the Cart model
});

const User = mongoose.model("User", userSchema);

module.exports = User;
