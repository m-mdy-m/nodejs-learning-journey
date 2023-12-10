const Product = require("../models/product.js");

exports.getProducts = (req, res, next) => {
	Product.fetchAll(product => {
		res.render("shop/product-list", {
			prods: product,
			pageTitle: "All Products",
			path: req.path,
		});
	});
};

exports.getProduct = (req, res, next) => {
	const productId = req.params.productId;
	Product.findById(productId, pro => {
		if (pro) {
			res.render("shop/product-detail", {
				product: pro,
				pageTitle: pro.title,
				path: req.path,
			});
		}
		else{
			console.log("err");
		}
	});
};

exports.getIndex = (req, res, next) => {
	Product.fetchAll(product => {
		res.render("shop/index", {
			prods: product,
			pageTitle: "Shop",
			path: req.path,
		});
	});
};

exports.getCart = (req, res, next) => {
	res.render("shop/cart", {
		pageTitle: "Your Cart",
		path: req.path,
	});
};

exports.postCart = (req,res,next)=>{
	const prodId = req.body.productId;
	console.log(prodId);
	res.redirect('/cart')
}



exports.getOrders = (req, res, next) => {
	res.render("shop/orders", {
		pageTitle: "Your Orders",
		path: req.path,
	});
};
exports.getCheckout = (req, res, next) => {
	res.render("shop/checkout", {
		pageTitle: "Checkout",
		path: req.path,
	});
};
