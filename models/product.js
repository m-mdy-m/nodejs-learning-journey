const getDb = require("../util/database").getDb

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
	constructor(title,price , description,imageUrl){
		this.title = title
		this.price = price
		this.description = description
		this.imageUrl = imageUrl
	}	
	save(){

	}
}
module.exports = Product