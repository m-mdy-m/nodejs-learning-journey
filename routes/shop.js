// shop.js
const path = require("path");
const routeDir = require("../util/path.js");
const express = require("express");
const router = express.Router();
const admin = require("./admin.js");
router.get("/", (req, res, next) => {
	const product = admin.product;
	// console.log("shop =>",admin.product);
	// res.sendFile(path.join(routeDir, 'views', 'shop.html'));
	console.log("products =>", product);
	res.render("shop", { prods: product, docTitle: "shop" });
});

module.exports = router;
