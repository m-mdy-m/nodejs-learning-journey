const Product = require("../models/product.js");

exports.getAddProduct = (req, res, next) => {
	res.render("admin/add-product", {
		pageTitle: 'Add Product',
		path: req.path,
		formsCSS: true,
    productCSS: true,
    activeAddProduct: true
	});
};
exports.postAddProduct = (req, res, next) => {
	const title = req.body.title;
	const imgUrl = req.body.imgUrl;
	const price = req.body.price;
	const description = req.body.description;
	const product = new Product(title,imgUrl,price,description);
	product.save();
	res.redirect("/");
};

exports.getProducts = (req, res, next) => {
	Product.fetchAll(product => {
		res.render("admin/products", {
			prods: product,
			pageTitle: 'Admin Products',
			path: req.path,
		});
	});
};
