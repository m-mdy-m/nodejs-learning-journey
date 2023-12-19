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
				const collection = await db.collection("products");
				const resulting = await collection.insertOne(this);
				console.log("inserting");
				console.log('resulting =>',resulting);
				return resulting
			} catch (e) {
				console.log("Error inserting product", e);
			throw e;
			}
		};
		inserting()
	}
}
module.exports = Product;
