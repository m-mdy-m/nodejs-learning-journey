const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const productSchema = new Schema({
	title  : {
		type : String,
		required : true,
	},
	price : {
		type : Number,
		required : true,
	},
	description : {
		type : String,
		required : true
	},
	imageUrl : {
		type : String,
		required : true
	},
	userId : {
		type : Schema.Types.ObjectId,
		ref : "User"
	}
})
module.exports = mongoose.model('Product',productSchema)


// const mongodb = require("mongodb");
// const getDb = require("../util/database").getDb;

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

// class Product {
// 	constructor(title, price, description, imageUrl, id, userId) {
// 		this.title = title;
// 		this.price = price;
// 		this.description = description;
// 		this.imageUrl = imageUrl;
// 		this._id = id? new mongodb.ObjectId(id) : null;
// 		this.userId = userId
// 	}
// 	save() {
// 		const db = getDb();
// 		let dbOp;
// 		if (this._id) {
// 			dbOp = db.collection("products").updateOne(
// 				{
// 					_id:this._id,
// 				},
// 				{ $set: this }
// 			);
// 		} else {
// 			dbOp = db.collection("products").insertOne(this);
// 		}
// 		return dbOp.then(result => {
// 			console.log(result);
// 		});
// 	}

// 	static fetchAll() {
// 		const db = getDb();
// 		try {
// 			return db.collection("products").find().toArray();
// 		} catch (e) {
// 			console.log(e);
// 			throw e;
// 		}
// 	}
// 	static isValidId(id) {
// 		return /^[0-9a-zA-Z]{24}$/.test(id);
// 	}

// 	static findById(prodId) {
// 		console.log("prodId =>", prodId);
// 		const db = getDb();
// 		if (!this.isValidId(prodId)) {
// 			return console.log("invalid");
// 		}
// 		try {
// 			return db
// 				.collection("products")
// 				.findOne({ _id: new mongodb.ObjectId(prodId) });
// 		} catch (e) {
// 			console.log(e);
// 			throw e;
// 		}
// 	}
// 	static deleteById(prodId){
// 		const db = getDb()
// 		return db.collection('products').deleteOne({_id : new mongodb.ObjectId(prodId)}).then(result=>{
// 			console.log('deleted');
// 		})
// 	}
// }
// module.exports = Product;
