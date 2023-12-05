// Import the express module
const express = require("express");

// Create an Express application
const app = express();

// This is middleware that processes every request that comes in.
app.use((req, res, next) => {
  // Send a response with the text "hi this is test" to the client
  res.send("hi this is test");
  
  // Log the 'next' function to the console for demonstration purposes
  console.log("next =>", next);

  // Proceed to the next middleware (if there is none, this does nothing)
  next();
});

// Start the Express application server on port 3000 and log a message to the console.
app.listen(3000,()=>{
    console.log('Server running on port 3000');
});