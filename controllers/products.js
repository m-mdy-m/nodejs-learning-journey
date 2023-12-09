exports.getAddProduct = (req, res, next) => {
	res.render("add-product", {
		pageTitle: "add products",
		path: "/admin/add-product",
		productsCSS: true,
		activeAddProduct: true,
	});
};
