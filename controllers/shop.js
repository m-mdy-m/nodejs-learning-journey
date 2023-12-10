const Product = require("../models/product.js");

exports.getProducts = (req, res, next) => {
	Product.fetchAll(product => {
		res.render("shop/product-list", {
			prods: product,
			pageTitle: "product-list",
			path: req.path,
		});
	});
};
exports.getIndex = (req, res, next) => {
	Product.fetchAll(product => {
		res.render("shop/index", {
			prods: product,
			pageTitle: "index",
			path: req.path,
		});
	});
};

exports.getCart = (req, res, next) => {
	res.render("shop/cart", {
		pageTitle: "cart",
		path: req.path,
	});
};
exports.getCheckout  = (req, res, next) => {
	res.render("shop/checkout", {
		pageTitle: "CheckOut",
		path: req.path,
	});
};
