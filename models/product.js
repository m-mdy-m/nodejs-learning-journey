// const Products = [ ];
const fs = require("fs");
const path = require("path");
const pth = path.join(
	path.dirname(process.mainModule.filename),
	"data",
	"products.json"
);
const getProductFormFile = cb => {
	fs.readFile(pth, (err, data) => {
		if (err) {
			return cb([]);
		} else {
			cb(JSON.parse(data));
		}
	});
};
module.exports = class Product {
	constructor(title) {
		this.title = title;
	}
	save() {
		// Products.push(this);
		// const pth = path.join(
		// 	path.dirname(process.mainModule.filename),
		// 	"data",
		// 	"products.json"
		// );
		// fs.readFile(pth, (err, data) => {
		// 	let products = [];
		// 	if (!err) {
		// 		products = JSON.parse(data);
		// 		console.log("pro =>", products);
		// 	}
		// 	products.push(this);
		// 	fs.writeFile(pth, JSON.stringify(products), err => {
		// 		console.log("err file", err);
		// 	});
		// });

		// =====
		// Better Code =>
		// =====
		getProductFormFile(pro => {
			pro.push(this);
			fs.writeFile(pth, JSON.stringify(pro), err => {
				console.log(err);
			});
		});
	}
	static fetchAll(cb) {
		getProductFormFile(cb);
	}
};
