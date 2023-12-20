const Product = require("../models/product");
exports.getProducts = async (req, res, next) => {
	const products = Product.fetchAll();
	try {
		res.render("shop/product-list", {
			prods: products,
			pageTitle: "All Products",
			path: "/products",
		});
	} catch (err) {
		console.log(err);
	}
	// Product.findAll()
	// 	.then(products => {
	// 		res.render("shop/product-list", {
	// 			prods: products,
	// 			pageTitle: "All Products",
	// 			path: "/products",
	// 		});
	// 	})
	// 	.catch(err => {
	// 		console.log(err);
	// 	});
};

exports.getProduct = async (req, res, next) => {
	const prodId = req.params.productId;
	try {
		const product = await Product.findById(prodId);
		if (!Product.isValidId(prodId)) {
			res.status(400).send("Invalid product ID format.");
			return;
		}
		res.render("shop/product-detail", {
			product: product,
			pageTitle: product.title,
			path: "/products",
		});
	} catch (e) {
		console.log("e =>", e);
	}
	// Product.findById(prodId)
	//==================================
	// Product.findAll({ WHERE: { id: prodId } })
	// 	.then(product => {
	// 		if (product) {
	// res.render("shop/product-detail", {
	// 	product: product[0],
	// 	pageTitle: product[0].title,
	// 	path: "/products",
	// });
	// 		}
	// 	})
	// 	.catch();
	// ===================================================
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

exports.getIndex = async (req, res, next) => {
	try {
		await Product.fetchAll().then(products => {
			res.render("shop/index", {
				prods: products,
				pageTitle: "Shop",
				path: "/",
			});
		});
	} catch (e) {
		console.log("err =>", e);
	}
};

exports.getCart = async (req, res, next) => {
	const products = await req.user.getCart();
	res.render("shop/cart", {
		path: "/cart",
		pageTitle: "Your Cart",
		products: products,
	});
	// ===============
	// req.user
	// 	.getCart()
	// 	.then(carts => {
	// 		console.log("carts =>", carts);
	// 		return carts
	// 			.getProducts()
	// 			.then(products => {
	// 				res.render("shop/cart", {
	// 					path: "/cart",
	// 					pageTitle: "Your Cart",
	// 					products: products,
	// 				});
	// 			})
	// 			.catch(err => {
	// 				console.log(err);
	// 			});
	// 	})
	// 	.catch(err => {
	// 		console.log(err);
	// 	});
	// ===============
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

exports.postCart = async (req, res, next) => {
	const prodId = await req.body.productId;
	const product = await Product.findById(prodId);
	const addCart = await req.user.addToCart(product);
	console.log("add cart =>", addCart);
	addCart
	return res.redirect("/cart");

	// ============================
	// let fetchedCart;
	// let newQuantity = 1;

	// =======================
	// Product.findById(prodId, product => {
	// 	Cart.addProduct(prodId, product.price);
	// });
	// res.redirect("/cart");
	// =========================
	// req.user
	// 	.getCart()
	// 	.then(cart => {
	// 		console.log("cart =>", cart);
	// 		fetchedCart = cart;
	// 		return cart.getProducts({ WHERE: { id: prodId } });
	// 	})
	// 	.then(products => {
	// 		let product;
	// 		if (products.length > 0) {
	// 			product = products[0];
	// 		}
	// 		if (product) {
	// 			const oldQuantity = product.cartItem.quantity;
	// 			newQuantity = oldQuantity + 1;
	// 			return product;
	// 		}
	// 		return Product.findByPk(prodId);
	// 	})
	// 	.then(product => {
	// 		return fetchedCart.addProduct(product, {
	// 			through: { quantity: newQuantity },
	// 		});
	// 	})

	// 	.then(() => {
	// 		res.redirect("/cart");
	// 	})
	// 	.catch(err => {
	// 		console.log(err);
	// 	});
};

exports.postCartDeleteProduct = (req, res, next) => {
	const prodId = req.body.productId;
	req.user
		.deleteItemFromCart(prodId)
		.then(result => {
			console.log(result);
			console.log("user delete");
			res.redirect("/cart");
		})
		.catch(err => {
			console.log(err);
		});
};
exports.postOrder = (req, res, next) => {
	let fetchedCart;
	req.user
		.getCart()
		.then(cart => {
			fetchedCart = cart;
			return cart.getProducts();
		})
		.then(products => {
			return req.user
				.createOrder()
				.then(order => {
					return order.addProduct(
						products.map(product => {
							product.orderItem = {
								quantity: product.cartItem.quantity,
							};
							return product;
						})
					);
				})
				.catch(err => {
					console.log(err);
				});
		})
		.then(result => {
			return fetchedCart.setProducts(null);
		})
		.then(result => {
			res.redirect("/orders");
		})
		.catch(err => {
			console.log(err);
		});
};
exports.getOrders = (req, res, next) => {
	req.user
		.getOrders({ include: ["products"] })
		.then(orders => {
			res.render("shop/orders", {
				path: "/orders",
				pageTitle: "Your Orders",
				orders,
			});
		})
		.catch(err => {
			console.log(err);
		});
};

exports.getCheckout = (req, res, next) => {
	res.render("shop/checkout", {
		path: "/checkout",
		pageTitle: "Checkout",
	});
};
