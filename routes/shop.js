// shop.js
const express = require("express");
const productsController = require("../controllers/products.js")
const router = express.Router();
const path = require('path')
router.get("/", productsController.getProducts);



module.exports = router;
