// admin.js
const productsController = require('../controllers/products.js')
const express = require("express");
const router = express.Router();
router.get("/add-product", productsController.getAddProduct);

router.post("/product", productsController.postAddProduct);

module.exports = router