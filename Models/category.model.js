// category.model.js
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  // Add other fields related to the category if needed
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
