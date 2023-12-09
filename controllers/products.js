const product = [];

exports.getAddProduct = (req, res, next) => {
	res.render("add-product", {
		pageTitle: "add products",
		path: "/admin/add-product",
		productsCSS: true,
		activeAddProduct: true,
	});
};
exports.postAddProduct = (req, res, next) => {
	product.push({ title: req.body.title });
	res.redirect("/");
}
exports.getProducts = (req, res, next) => {
	res.render("shop", {
		prods: product,
		pageTitle: "shop",
		path: "/",
		hasProducts: product.length > 0,
		activeShop:true,
		productsCSS:true,
	});
}