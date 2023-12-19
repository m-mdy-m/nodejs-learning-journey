const getDb = require("../util/database").getDb;
const db = getDb();

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
	static fetchAll(){
		const fetch = async ()=>{
			try{
				const products = await db.collection('products').find().toArray()
				console.log('products =>', products);
				return products
			}catch(e){
				console.log(e);
			}
		}
		return fetch()
	}
}
module.exports = Product;
