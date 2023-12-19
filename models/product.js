const mongodb = require("mongodb");
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
	constructor(title, price, description, imageUrl,id) {
		this.title = title;
		this.price = price;
		this.description = description;
		this.imageUrl = imageUrl;
		this._id = id
	}
	save() {
		const db = getDb();
		let dbOp ;
		if (this._id) {
			dbOp = db.collection('products').updateOne(
				{
					_id : new mongodb.ObjectId(this._id)
				},
				{$set : this}
				)
		}else{
			dbOp = db.collection('products').insertOne(this)
		}
		const inserting = async () => {
			try {
				console.log("inserting");
				return await dbOp.collection("products").insertOne(this);
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
	static isValidId(id){
		return /^[0-9a-zA-Z]{24}$/.test(id)
	}

	static findById(prodId) {
		console.log("prodId =>", prodId);
		const db = getDb();
		if (!this.isValidId(prodId)) {
			return console.log('invalid');
		}
		try {
			return db.collection("products").findOne({ _id: new mongodb.ObjectId(prodId) });
		} catch (e) {
			console.log(e);
			throw e;
		}
	}
}
module.exports = Product;
