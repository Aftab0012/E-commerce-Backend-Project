// app.js
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./Routes/authRoutes");
const categoryRoutes = require("./Routes/categoryRoutes");
const productRoutes = require("./Routes/product.route");
const cartRoute = require("./Routes/cart.Route");
const passport = require("./config/passports");
const rateLimit = require("express-rate-limit");

const app = express();
const PORT = 3000;
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 25, // Limit each IP to 25 requests per windowMs
});

const DB_URI = "mongodb://127.0.0.1:27017/cart";
mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("Connected to Db at, " + DB_URI);
  })
  .catch((error) => {
    console.log(error);
  });

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use("/auth", limiter, authRoutes);

app.use(passport.initialize());

// Route to handle category-related APIs
app.use(
  "/categories",
  passport.authenticate("jwt", { session: false }),
  categoryRoutes
);

// Route to handle product-related APIs
app.use(
  "/productapis",
  passport.authenticate("jwt", { session: false }),
  productRoutes
);

// Route to handle product details API (this seems like a duplicate of the previous product route, but I kept it as-is)
app.use(
  "/productDetails",
  passport.authenticate("jwt", { session: false }),
  productRoutes
);

// Route to handle cart-related APIs
app.use("/cart", passport.authenticate("jwt", { session: false }), cartRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
