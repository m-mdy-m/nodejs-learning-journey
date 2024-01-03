const Product = require("../models/product");
const Order = require("../models/order");
const fs = require("fs");
const path = require("path");
const PDFdocument = require("pdfkit");
exports.getProducts = async (req, res, next) => {
	const products = Product.find();
	try {
		res.render("shop/product-list", {
			prods: products,
			pageTitle: "All Products",
			path: "/products",
			isAuthenticated: req.session.isLoggedIn,
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
			isAuthenticated: req.session.isLoggedIn,
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
		const user = await req.user.populate("cart.items.productId");

		const products = user.cart.items;
		res.render("shop/cart", {
			path: "/cart",
			pageTitle: "Your Cart",
			products,
			isAuthenticated: req.session.isLoggedIn,
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
	const user = await req.user.populate("cart.items.productId"); // Directly awaiting populate()

	const products = user.cart.items.map(i => {
		return { quantity: i.quantity, product: { ...i.productId._doc } };
	});
	const order = new Order({
		user: {
			email: req.user.email,
			userId: req.user,
		},
		products,
	});
	order.save();
	req.user.clearCart();
	return res.redirect("/orders");
};
exports.getOrders = async (req, res, next) => {
	const orders = await Order.find({ "user.userId": req.user._id });
	res.render("shop/orders", {
		path: "/orders",
		pageTitle: "Your Orders",
		orders,
		isAuthenticated: req.session.isLoggedIn,
	});
};

exports.getCheckout = (req, res, next) => {
	res.render("shop/checkout", {
		path: "/checkout",
		pageTitle: "Checkout",
	});
};
exports.getInvoice = async (req, res, nxt) => {
	const orderId = req.params.orderId;
	const order = await Order.findById(orderId);
	if (!order) {
		return nxt(new Error("No Order Found"));
	}
	if (order.user.userId.toString() !== req.user._id.toString()) {
		return nxt(new Error("Unauthorized"));
	}
	const invoiceName = `invoice-${orderId}.pdf`;
	console.log("invoiceName =>", invoiceName);

	const invoicePath = path.join("data", "invoices", invoiceName);
	console.log("invoicePath =>", invoicePath);
	const pdfDoc = new PDFdocument();
	res.setHeader("Content-Type", "application/pdf");
	res.setHeader(
		"Content-Disposition",
		'attachment; filename="' + invoiceName + '"'
	);
	pdfDoc.pipe(fs.createWriteStream(invoicePath));
	pdfDoc.pipe(res);

	// pdfDoc.text('hello ') // just example
	// styling PDF
	pdfDoc.fontSize(25).text("Invoice", {
		underline: true,
	});
	pdfDoc.text("-------------------------");
	let totalPrice = 0

	order.products.forEach(prod => {
		totalPrice += prod.quantity * prod.product.price
		pdfDoc.text(
			prod.product.title +
				"-" +
				prod.quantity +
				"-" +
				"$" +
				prod.product.price
		);
	});
	pdfDoc.text("ToTAL PRICE :$"+totalPrice)
	pdfDoc.end();
	// fs.readFile(invoicePath, (err, data) => {
	// 	if (err) {
	// 		return nxt(err);
	// 	}
	// 	res.setHeader("Content-Type", "application/pdf");
	// 	res.setHeader(
	// 		"Content-Disposition",
	// 		'attachment; filename="' + invoiceName + '"'
	// 	);
	// 	res.send(data);
	// });
	// ======
	// const file = fs.createReadStream(invoicePath);
	// res.setHeader("Content-Type", "application/pdf");
	// res.setHeader(
	// 	"Content-Disposition",
	// 	'attachment; filename="' + invoiceName + '"'
	// );
	// file.pipe(res)
};
