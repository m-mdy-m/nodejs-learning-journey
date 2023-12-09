const Product = require('../models/product.js')

exports.getAddProduct = (req, res, next) => {
	res.render("add-product", {
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
	const product = Product.fetchAll()
	res.render("shop", {
		prods: product,
		pageTitle: "shop",
		path: req.path,
		hasProducts: product.length > 0,
		activeShop: true,
		productsCSS: true,
	});
};
