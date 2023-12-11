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
			cb([]);
		} else {
			cb(JSON.parse(data));
		}
	});
};
module.exports = class Product {
	constructor(id, title, imageUrl, description, price) {
		this.id = id;
		this.title = title;
		this.imageUrl = imageUrl;
		this.description = description;
		this.price = price;
	}
	save() {
		getProductFormFile(pro => {
			if (this.id) {
				const existingProductIndex = pro.findIndex(
				  prod => prod.id === this.id
				);
				const updatedProducts = [...pro];
				updatedProducts[existingProductIndex] = this;
				fs.writeFile(pth, JSON.stringify(updatedProducts), err => {
				  console.log(err);
				});
			  }else{
				this.id = Math.random().toString();
				pro.push(this);
				fs.writeFile(pth, JSON.stringify(pro), err => {
					console.log("ERROR FILE WRITE => ", err);
				});
			}
		});
	}
	static fetchAll(cb) {
		getProductFormFile(cb);
	}
	static findById(id, cb) {
		getProductFormFile(products => {
			const product = products.find(p => p.id === id);
			cb(product);
		});
	}
};
