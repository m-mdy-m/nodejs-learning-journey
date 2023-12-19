const mongodb = require('mongodb')
const getDb = require("../util/database").getDb;

// const Sequelize  = require("sequelize")

// const sequelize = require("../util/database")

// const Product = sequelize.define('product',{
// 	id : {
// 		type :Sequelize.INTEGER,
// 		autoIncrement : true,
// 		primaryKey: true,
// 		allowNull: false,
// 	},
// 	title:Sequelize.STRING,
// 	price:{
// 		type : Sequelize.DOUBLE,
// 		allowNull:false,
// 	},
// 	imageUrl : {
// 		type:Sequelize.STRING,
// 		allowNull:false,
// 	},
// 	description:{
// 		type : Sequelize.STRING,
// 		allowNull : false,
// 	}
// })

class Product {
	constructor(title, price, description, imageUrl) {
		this.title = title;
		this.price = price;
		this.description = description;
		this.imageUrl = imageUrl;
	}
	save() {
		const db = getDb();
		const inserting = async () => {
			try {
				console.log("inserting");
				return await db.collection("products").insertOne(this);
			} catch (e) {
				console.log("Error inserting product", e);
				throw e;
			}
		};
		return inserting();
	}
	static fetchAll() {
		const db = getDb();
		try {
			return db.collection("products").find().toArray();
		} catch (e) {
			console.log(e);
			throw e;
		}
	}
	static findById(prodId) {
		const db = getDb();
		try {
			return db.collection("products").findOne({ _id: new mongodb.ObjectId(prodId) });
		} catch (e) {
			console.log(e);
			throw e;
		}
	}
}
module.exports = Product;
