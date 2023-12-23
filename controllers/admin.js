const Product = require("../models/product");
const mongodb = require("mongodb");
exports.getAddProduct = (req, res, next) => {
	res.render("admin/edit-product", {
		pageTitle: "Add Product",
		path: "/admin/add-product",
		editing: false,
	});
};

exports.postAddProduct = async (req, res, next) => {
	try {
		const title = req.body.title;
		const imageUrl = req.body.imageUrl;
		const price = req.body.price;
		const description = req.body.description;
		// const product = new Product(title, price, description, imageUrl,null, req.user._id);
		const product = new Product({
			title,
			price,
			description,
			imageUrl,
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
		const newProducts = new Product(
			updatedTitle,
			updatedPrice,
			updatedDesc,
			updatedImageUrl,
			prodId
		);
		const update = await newProducts.save();
		console.log("update user ", update);
		res.redirect("/");
	} catch (err) {
		console.log(err);
	}
};

exports.getProducts = async (req, res, next) => {
	try {
		const products = await Product.find();
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
	await Product.deleteById(prodId);
	console.log("DESTROYED PRODUCT ");
	res.redirect("/admin/products");
};
