const Product = require("../models/product.js");

exports.getAddProduct = (req, res, next) => {
	res.render("admin/add-product", {
		pageTitle: "add products",
		path: req.path,
		productsCSS: true,
		activeAddProduct: true,
	});
};
exports.postAddProduct = (req, res, next) => {
	const product = new Product(req.body.title);
	product.save();
	res.redirect("/");
};
exports.getProducts = (req, res, next) => {
	Product.fetchAll(product => {
		res.render("shop/product-list", {
			prods: product,
			pageTitle: "product-list",
			path: req.path,
			hasProducts: product.length > 0,
			activeShop: true,
			productsCSS: true,
		});
	});
};
