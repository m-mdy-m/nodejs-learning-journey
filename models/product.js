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
	constructor(title,imgUrl,description,price) {
		this.title = title;
		this.imgUrl = imgUrl
		this.description = description
		this.price = price
	}
	save() {
		this.id = Math.random().toString()
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
