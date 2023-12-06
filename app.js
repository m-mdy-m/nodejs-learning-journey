// Import express package for creating server and handling routes
const express = require("express");
// Import body-parser package to parse incoming request bodies
const bodyParser = require("body-parser");
// Initialize a new Express application
const app = express();

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended :false}));

// Serve HTML form at the '/add-product' GET route
app.get("/add-product", (req, res, next) => {
  // Respond with a simple form for inputting product data
  res.send(`
    <form action="/product" method="POST">
      <input type="text" name="productName" placeholder="Enter product name" >
      <button type="submit">Add Product</button>
    </form>`);
});

// Handle form submission at the '/product' POST route
app.post("/product", (req, res, next) => {
  // Log submitted product data to the console
  console.log(req.body);
  // Redirect to the home page after submission
  res.redirect('/');
});

// Define a GET route for the home page
app.use("/", (req, res, next) => {
  // Send a basic welcome message
  res.send("<h1>Welcome to the Basic Product Adder App</h1>");
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log("Server running on port 3000");
});