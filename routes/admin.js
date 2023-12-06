// admin.js
const path = require("path");
const express = require("express");
const router = express.Router();

// Route for serving the 'add-product' page
router.get("/add-product", (req, res, next) => {
  // Send the 'add-product.html' file for the '/add-product' route
  res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'));
});

// Route for posting product data
router.post("/product", (req, res, next) => {
  // Log the product data to the console
  console.log(req.body);
  // Redirect to the shop home page after adding a product
  res.redirect("/");
});

module.exports = router; // Export the router for use in other files