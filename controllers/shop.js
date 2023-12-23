const Product = require("../models/product");
exports.getProducts = async (req, res, next) => {
	const products = Product.find();
	try {
		res.render("shop/product-list", {
			prods: products,
			pageTitle: "All Products",
			path: "/products",
		});
	} catch (err) {
		console.log(err);
	}
};

exports.getProduct = async (req, res, next) => {
	const prodId = req.params.productId;
	try {
		const product = await Product.findById(prodId);
		res.render("shop/product-detail", {
			product: product,
			pageTitle: product.title,
			path: "/products",
		});
	} catch (e) {
		console.log("e =>", e);
	}
};

exports.getIndex = async (req, res, next) => {
	try {
		const products = await Product.find();
		res.render("shop/index", {
			prods: products,
			pageTitle: "Shop",
			path: "/",
		});
	} catch (e) {
		console.log("err =>", e);
	}
};

exports.getCart = async (req, res, next) => {
	try {
		const user = await req.user.populate("cart.items.productId"); // Directly awaiting populate()

		const products = user.cart.items;
		res.render("shop/cart", {
			path: "/cart",
			pageTitle: "Your Cart",
			products,
		});
	} catch (error) {
		console.log(error);
		next(error); // Handle the error
	}
};
exports.postCart = async (req, res, next) => {
	const prodId = req.body.productId;
	const product = await Product.findById(prodId);
	const addCart = await req.user.addToCart(product);
	console.log("add cart =>", addCart);
	addCart;
	return res.redirect("/cart");
};

exports.postCartDeleteProduct = async (req, res, next) => {
	const prodId = await req.body.productId;
	console.log("id =>", req.body);
	const deleteUser = await req.user.removeFromCart(prodId);
	console.log(deleteUser);
	console.log("user delete");
	return res.redirect("/cart");
};
exports.postOrder = async (req, res, next) => {
	let fetchedCart;
	await req.user.addOrder();
	res.redirect("/orders");
};
exports.getOrders = async (req, res, next) => {
	const orders = await req.user.getOrders();
	console.log("orders =>", orders);
	res.render("shop/orders", {
		path: "/orders",
		pageTitle: "Your Orders",
		orders,
	});
};

exports.getCheckout = (req, res, next) => {
	res.render("shop/checkout", {
		path: "/checkout",
		pageTitle: "Checkout",
	});
};
