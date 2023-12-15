const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
	Product.findAll()
		.then(products => {
			res.render("shop/product-list", {
				prods: products,
				pageTitle: "All Products",
				path: "/products",
			});
		})
		.catch(err => {
			console.log(err);
		});
};

exports.getProduct = (req, res, next) => {
	const prodId = req.params.productId;
	Product.findAll({ WHERE: { id: prodId } })
		.then(product => {
			if (product) {
				res.render("shop/product-detail", {
					product: product[0],
					pageTitle: product[0].title,
					path: "/products",
				});
			}
		})
		.catch();
	// Product.findByPk(prodId)
	// 	.then(product => {
	// 		if (product) {
	// 			res.render("shop/product-detail", {
	// 				product: product,
	// 				pageTitle: product.title,
	// 				path: "/products",
	// 			});
	// 		}
	// 	})
	// 	.catch(err => {
	// 		console.log(err);
	// 	});
};

exports.getIndex = (req, res, next) => {
	Product.findAll()
		.then(products => {
			res.render("shop/index", {
				prods: products,
				pageTitle: "Shop",
				path: "/",
			});
		})
		.catch(err => {
			console.log(err);
		});
};

exports.getCart = (req, res, next) => {
	req.user
		.getCart()
		.then(carts => {
			console.log("carts =>", carts);
			return carts
				.getProducts()
				.then(products => {
					res.render("shop/cart", {
						path: "/cart",
						pageTitle: "Your Cart",
						products: products,
					});
				})
				.catch(err => {
					console.log(err);
				});
		})
		.catch(err => {
			console.log(err);
		});
	// Cart.getCart(cart => {
	// 	Product.fetchAll(products => {
	// 		const cartProducts = [];
	// 		for (product of products) {
	// 			const cartProductData = cart.products.find(
	// 				prod => prod.id === product.id
	// 			);
	// 			if (cartProductData) {
	// 				cartProducts.push({
	// 					productData: product,
	// 					qty: cartProductData.qty,
	// 				});
	// 			}
	// 		}
	//
	// 	});
	// });
};

exports.postCart = (req, res, next) => {
	const prodId = req.body.productId;
	let fetchedCart;
	let newQuantity = 1;
	// Product.findById(prodId, product => {
	// 	Cart.addProduct(prodId, product.price);
	// });
	// res.redirect("/cart");
	req.user
		.getCart()
		.then(cart => {
			console.log("cart =>", cart);
			fetchedCart = cart;
			return cart.getProducts({ WHERE: { id: prodId } });
		})
		.then(products => {
			let product;
			if (products.length > 0) {
				product = products[0];
			}
			if (product) {
				const oldQuantity = product.cartItem.quantity;
				newQuantity = oldQuantity+1
				return product
			}
			return Product.findByPk(prodId)
		}).then(product =>{
			return fetchedCart.addProduct(product, {
				through : {quantity : newQuantity}
			})
		})
		
		.then(() => {
			res.redirect("/cart")
		})
		.catch(err => {
			console.log(err);
		});
};

exports.postCartDeleteProduct = (req, res, next) => {
	const prodId = req.body.productId;
	Product.findById(prodId, product => {
		Cart.deleteProduct(prodId, product.price);
		res.redirect("/cart");
	});
};

exports.getOrders = (req, res, next) => {
	res.render("shop/orders", {
		path: "/orders",
		pageTitle: "Your Orders",
	});
};

exports.getCheckout = (req, res, next) => {
	res.render("shop/checkout", {
		path: "/checkout",
		pageTitle: "Checkout",
	});
};
