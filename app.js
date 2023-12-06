// Require the necessary modules
const express = require("express");
const bodyParser = require("body-parser");

// Importing router modules for different sections of the site
const AdminRouter = require("./routes/admin.js");
const ShopRouter = require("./routes/shop.js");

// Create an Express application
const app = express();

// Use body-parser middleware to parse form data
app.use(bodyParser.urlencoded({extended: false}));

// Mount the admin routes on the '/admin' path
app.use("/admin", AdminRouter);

// Mount the shop routes on the root path
app.use(ShopRouter);

// Middleware for handling 404 errors (page not found)
app.use((req, res, next) => {
  res.status(404).send("<h1 style='color:red;'>Page Not Found 404</h1>")
});

// Start the server and listen on port 3000
app.listen(3000, () => {
  console.log("Server running on port 3000");
});