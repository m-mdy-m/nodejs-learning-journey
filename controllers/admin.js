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
		errMessage: null,
		validationErrors: [],
	});
};

exports.postAddProduct = async (req, res, next) => {
	try {
		const title = req.body.title;
		// const imageUrl = req.body.image;
		const imageUrl = req.file;
		console.log("img=>", imageUrl);
		const price = req.body.price;
		const description = req.body.description;
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			console.log(errors.array());
			return res.status(422).render("admin/edit-product", {
				pageTitle: "Add Product",
				path: "/admin/add-product",
				editing: false,
				hasError: true,
				product: {
					title,
					imageUrl,
					price,
					description,
				},
				errMessage: errors.array()[0].msg,
				validationErrors: errors.array(),
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
		// console.log("Cannot create product =>", err);
		// res.status(500).send(err); // Send an error response
		// return res.status(500).render("admin/edit-product", {
		// 	pageTitle: "Add Product",
		// 	path: "/admin/add-product",
		// 	editing: false,
		// 	hasError: true,
		// 	product: {
		// 		title: "",
		// 		imageUrl: "",
		// 		price: "",
		// 		description: "",
		// 	},
		// 	errMessage: "Database operation failed, please try agin",
		// 	validationErrors: [],
		// });
		// res.redirect("/500");
		const error = new Error(err);
		error.httpStatusCode = 500;
		return next(error);
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
			errMessage: null,
			validationErrors: [],
		});
	} catch (err) {
		const error = new Error(err);
		error.httpStatusCode = 500;
		return next(error);
	}
};

exports.postEditProduct = async (req, res, next) => {
	const prodId = req.body.productId;
	const updatedTitle = req.body.title;
	const updatedPrice = req.body.price;
	const updatedImageUrl = req.body.imageUrl;
	const updatedDesc = req.body.description;
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).render("admin/edit-product", {
			pageTitle: "Edit Product",
			path: "/admin/edit-product",
			editing: true,
			hasError: true,
			product: {
				title: updatedTitle,
				imageUrl: updatedImageUrl,
				price: updatedPrice,
				description: updatedDesc,
				_id: prodId,
			},
			errMessage: errors.array()[0].msg,
			validationErrors: errors.array(),
		});
	}

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
		const error = new Error(err);
		error.httpStatusCode = 500;
		return next(error);
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
		const error = new Error(e);
		error.httpStatusCode = 500;
		return next(error);
	}
};

exports.postDeleteProduct = async (req, res, next) => {
	const prodId = req.body.productId;
	try {
		console.log("user =>", req.user._id);
		await Product.deleteOne({ _id: prodId, userId: req.user._id });
		// await Product.findByIdAndDelete(prodId);
		console.log("DESTROYED PRODUCT ");
		res.redirect("/admin/products");
	} catch (err) {
		const error = new Error(err);
		error.httpStatusCode = 500;
		return next(error);
	}
};
