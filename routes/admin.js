// admin.js
const path = require("path");
const routeDir = require("../util/path.js");
const express = require("express");
const router = express.Router();
const product = [];
router.get("/add-product", (req, res, next) => {
  res.sendFile(path.join(routeDir, "views", "add-product.html"));
});

router.post("/product", (req, res, next) => {
  console.log("req.body =>",req.body);
  console.log("req.body.title =>",req.body.title);
  product.push({ title: req.body.title });
  res.redirect("/");
});

exports.router = router;
exports.product = product;
