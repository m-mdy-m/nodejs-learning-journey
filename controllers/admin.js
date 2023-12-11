const Product = require("../models/product.js");

exports.getAddProduct = (req, res, next) => {
	res.render("admin/edit-product", {
		pageTitle: "Add Product",
		path: req.path,
		editing: false,
	});
};

exports.postAddProduct = (req, res, next) => {
	const title = req.body.title;
	const imageUrl = req.body.imageUrl;
	const price = req.body.price;
	const description = req.body.description;
	const product = new Product(null, title, imageUrl, description, price);
	product.save();
	res.redirect("/");
};

exports.getEditProduct = (req, res, next) => {
	const editMode = req.query.edit;
	if (!editMode) {
		return res.redirect("/");
	}
	const prodId = req.params.productId;
	Product.findById(prodId, product => {
		if (!product) {
			return res.redirect("/");
		}
		res.render("admin/edit-product", {
			pageTitle: "Edit Product",
			path: req.path,
			editing: editMode,
			product: product,
		});
	});
};

exports.postEditProduct = (req, res, next) => {
	const prodId = req.body.productId;
	const updateTitle = req.body.title
	const updatePrice= req.body.price
	const updateImageUrl= req.body.imageUrl
	const updateDesc= req.body.description
	const updateProducts = new Product(prodId , updateTitle,updatePrice,updateImageUrl,updatePrice,updateDesc)
	updateProducts.save()
	res.redirect('/admin/products')
};

exports.getProducts = (req, res, next) => {
	Product.fetchAll(product => {
		res.render("admin/products", {
			prods: product,
			pageTitle: "Admin Products",
			path: req.path,
		});
	});
};

exports.postDeleteProduct = (req,res,next)=>{
	const prodId = req.body.productId
	Product.delete(prodId)
	res.redirect('/admin/products')
}