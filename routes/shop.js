// shop.js
const path = require("path");
const routeDir = require("../util/path.js")
const express = require("express");
const router = express.Router();
const admin = require("./admin.js")
router.get("/", (req, res, next) => {
  console.log("shop =>",admin.product);
  res.sendFile(path.join(routeDir, 'views', 'shop.html'));
});

module.exports = router; 