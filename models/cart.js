const fs = require("fs");
const path = require("path");

const p = path.join(
	path.dirname(process.mainModule.filename),
	"data",
	"cart.json"
);
module.exports = class Cart {
	static addProduct(id, productPrice) {
		// Fetch the previous cart
		fs.readFile(p, (err, fileContent) => {
			let cart = { products: [], totalPrice: 0 };
			if (!err) {
				cart = JSON.parse(fileContent);
			}
			const existingProductIndex = cart.products.findIndex(
				prod => prod.id === id
			);
			const existingProduct = cart.products[existingProductIndex];
			console.log(existingProduct);
			let updateProducts;
			if (existingProduct) {
				updateProducts = { ...existingProduct };
				updateProducts.qty = updateProducts.qty + 1;
				cart.products = [...cart.products];
				cart.products[existingProduct] = updateProducts;
			} else {
				updateProducts = { id: id, qty: 1 };
				cart.products = [...cart.products, updateProducts];
			}
			cart.totalPrice = cart.totalPrice + productPrice;
			fs.writeFile(p, JSON.stringify(cart), err => {
				console.log(err);
			});
		});
	}
	static deleteProduct(id, priceProduct) {
		fs.readFile(p, (err, data) => {
			if (err) {
				return;
			}
			const updatedCart = { ...JSON.parse(data) };
			const product = updatedCart.products.find(prod => prod.id === id);
			if (!product) {
				return;
			}
			const productQty = product.qty;
			updatedCart.products = updatedCart.products.filter(
				prod => prod.id !== id
			);
			updatedCart.totalPrice =
				updatedCart.totalPrice - priceProduct * productQty;
			fs.writeFile(p, JSON.stringify(updatedCart), err => {
				console.log(err);
			});
		});
	}
};
