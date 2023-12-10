// admin.js
const adminController = require("../controllers/admin.js");
const express = require("express");
const path = require("path");
const router = express.Router();

/// GET /admin/add-product
router.get("/add-product", adminController.getAddProduct);

/// GET /admin/products
router.get("/products", adminController.getProducts);

// POST
router.post("/product", adminController.postAddProduct);

module.exports = router;
