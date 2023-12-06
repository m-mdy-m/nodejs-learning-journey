// Import required core modules
const path = require("path");
const express = require("express");

// Import middleware for parsing request bodies
const bodyParser = require("body-parser");

// Create an Express application instance
const app = express();

// Import routes from separate files
const AdminRouter = require("./routes/admin.js");
const ShopRouter = require("./routes/shop.js");

// Apply the bodyParser middleware to parse form data from incoming requests
app.use(bodyParser.urlencoded({ extended: false }));

// Mount the admin router on '/admin' path for any admin related navigation
app.use("/admin", AdminRouter);

// Mount the shop router for the root path to handle shop-related routes
app.use(ShopRouter);

// Handle 404 errors - if none of the routes match, this middleware creates a 404 response
app.use((req, res, next) => {
  // Send a 404 error page using 'sendFile' method
  res.status(404).sendFile(path.join(__dirname,"views","404.html"));
});

// Start the Express server on port 3000
app.listen(3000, () => {
  console.log("Server running on port 3000"); // Log the server status to the console
});