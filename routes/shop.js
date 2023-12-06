// shop.js
const path = require("path");
const routeDir = require("../util/path.js");
const express = require("express");
const router = express.Router();
const admin = require("./admin.js");
router.get("/", (req, res, next) => {
	const product = admin.product;
	res.render("shop", {
		prods: product,
		pageTitle: "shop",
		path: "/",
		hasProducts: product.length > 0,
		activeShop:true,
		productsCSS:true,
	});
});

module.exports = router;
