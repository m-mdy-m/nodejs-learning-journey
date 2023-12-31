const Product = require("../models/product");
const mongodb = require("mongodb");
const { validationResult } = require("express-validator");
exports.getAddProduct = (req, res, next) => {
	// if(!req.session.isLoggedIn){
	// 	return res.redirect('/login')
	// } // این روش جواب میده ولی به چه قیمتی ؟
	res.render("admin/edit-product", {
		pageTitle: "Add Product",
		path: "/admin/add-product",
		editing: false,
		hasError: false,
	});
};

exports.postAddProduct = async (req, res, next) => {
	try {
		const title = req.body.title;
		const imageUrl = req.body.imageUrl;
		const price = req.body.price;
		const description = req.body.description;
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.status(422).render("admin/edit-product", {
				pageTitle: "Add Product",
				path: "/admin/edit-product",
				editing: false,
				hasError: true,
				product: {
					title,
					imageUrl,
					price,
					description,
				},
			});
		}
		// const product = new Product(title, price, description, imageUrl,null, req.user._id);
		console.log("req.user =>", req.session.user);
		const product = new Product({
			title,
			price,
			description,
			imageUrl,
			// userId: req.user, // ** req.user._id    را انتخاب کنیم مونگوس ایدی ان را انتخاب میکند req.user فرقی ندارد حتی اگر
			userId: req.session.user,
		});
		await product.save();
		console.log("create user");
		res.redirect("/");
	} catch (err) {
		console.log("Cannot create product =>", err);
		res.status(500).send(err); // Send an error response
	}
};

exports.getEditProduct = async (req, res, next) => {
	const editMode = req.query.edit;
	if (!editMode) {
		return res.redirect("/");
	}
	const prodId = req.params.productId;
	try {
		const products = await Product.findById(prodId);
		if (!products) {
			res.redirect("/");
		}
		res.render("admin/edit-product", {
			pageTitle: "Edit Product",
			path: "/admin/edit-product",
			editing: editMode,
			product: products,
			hasError: false,
		});
	} catch (err) {
		console.log(err);
	}
};

exports.postEditProduct = async (req, res, next) => {
	const prodId = req.body.productId;
	const updatedTitle = req.body.title;
	const updatedPrice = req.body.price;
	const updatedImageUrl = req.body.imageUrl;
	const updatedDesc = req.body.description;
	console.log("id =>", prodId);
	try {
		const product = await Product.findById(prodId);
		if (product.userId.toString() !== req.session.user._id.toString()) {
			return res.redirect("/");
		}
		product.title = updatedTitle;
		product.price = updatedPrice;
		product.description = updatedDesc;
		product.imageUrl = updatedImageUrl;
		product.save();
		return res.redirect("/");
	} catch (err) {
		console.log(err);
	}
};

exports.getProducts = async (req, res, next) => {
	try {
		const products = await Product.find({ userId: req.session.user._id });
		// .select("title price -_id")
		// .populate("userId", "name");
		res.render("admin/products", {
			prods: products,
			pageTitle: "Admin Products",
			path: "/admin/products",
		});
	} catch (e) {
		console.log("e =>", e);
	}
};

exports.postDeleteProduct = async (req, res, next) => {
	const prodId = req.body.productId;
	console.log("user =>", req.user._id);
	await Product.deleteOne({ _id: prodId, userId: req.user._id });
	// await Product.findByIdAndDelete(prodId);
	console.log("DESTROYED PRODUCT ");
	res.redirect("/admin/products");
};
