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

	// Product.create({
	// 	title,
	// 	price,
	// 	description,
	// 	imageUrl,
	// })
	// 	.then(result => {
	// 		console.log("created Product");
	// 		res.redirect("/");
	// 	})
	// 	.catch(err => {
	// 		console.log(err);
	// 	});
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
	// req.user
	// 	.getProducts({ WHERE: { id: prodId } })
	// 	// Product.findByPk(prodId)
	// 	.then(products => {
	// 		const product = products[0];
	// 		if (!product) {
	// 			return res.redirect("/");
	// 		}
	// 		res.render("admin/edit-product", {
	// 			pageTitle: "Edit Product",
	// 			path: "/admin/edit-product",
	// 			editing: editMode,
	// 			product: product,
	// 		});
	// 	})
	// 	.catch();
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
	// Product.findByPk(prodId)
	// 	.then(products => {
	// 		products.title = updatedTitle;
	// 		products.price = updatedPrice;
	// 		products.imageUrl = updatedImageUrl;
	// 		products.description = updatedDesc;
	// 		return products.save();
	// 	})
	// 	.then(result => {
	// 		console.log("update products");
	// 		res.redirect("/admin/products");
	// 	})
	// 	.catch(err => {
	// 		console.log(err);
	// 	});
};

exports.getProducts = async (req, res, next) => {
	try {
		const products = await Product.fetchAll();
		res.render("admin/products", {
			prods: products,
			pageTitle: "Admin Products",
			path: "/admin/products",
		});
	} catch (e) {
		console.log("e =>", e);
	}

	// req.user
	// 	.getProducts()
	// 	// Product.findAll()
	// 	.then(products => {
	// 		res.render("admin/products", {
	// 			prods: products,
	// 			pageTitle: "Admin Products",
	// 			path: "/admin/products",
	// 		});
	// 	})
	// 	.catch(err => {
	// 		console.log(err);
	// 	});
};

exports.postDeleteProduct = async (req, res, next) => {
	const prodId = req.body.productId;
	await Product.deleteById(prodId);
	console.log("DESTROYED PRODUCT ");
	res.redirect("/admin/products");

	// Product.findByPk(prodId)
	// 	.then(products => {
	// 		return products.destroy();
	// 	})
	// 	.then(result => {
	// 		console.log("delete users");
	// 		res.redirect("/admin/products");
	// 	})
	// 	.catch(err => {
	// 		console.log(err);
	// 	});
	// res.redirect("/admin/products");
};
