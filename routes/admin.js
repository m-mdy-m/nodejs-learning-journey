// admin.js
const path = require("path");
const routeDir = require("../util/path.js");
const express = require("express");
const router = express.Router();
const product = [];
router.get("/add-product", (req, res, next) => {
  res.render('add-product',{pageTitle:"add products", path:"/admin/add-product"})
});

router.post("/product", (req, res, next) => {
  product.push({ title: req.body.title });
  res.redirect("/");
});

exports.router = router;
exports.product = product;
