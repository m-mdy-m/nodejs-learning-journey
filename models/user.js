const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;
// const Sequelize = require("sequelize");

// const sequelize = require("../util/database");

// const User = sequelize.define("user", {
// 	id: {
// 		type: Sequelize.INTEGER,
// 		autoIncrement: true,
// 		primaryKey: true,
//         allowNull: false,
// 	},
//     name : Sequelize.STRING,
//     email :Sequelize.STRING
// });

// module.exports = User
class User {
	constructor(username, email, cart, id) {
		this.name = username;
		this.email = email;
		this.cart = cart;
		this._id = id;
	}
	async save() {
		const db = getDb();
		return await db.collection("users").insertOne(this);
	}

	async addToCart(product) {
		console.log('product =>', product);
		// const cartProduct = this.cart.items.findIndex(cp=>{
		// 	return cp._id === product._id
		// })
		const objectId = mongodb.ObjectId;
		const updateCart = {
			items: [
				{ prodId : new objectId(product._id), quantity: 1 },
			],
		};
		const db = getDb();
		return await db
			.collection("users")
			.updateOne(
				{ _id: new objectId(this._id) },
				{ $set: { cart: updateCart } }
			);
	}

	static async findById(userId) {
		const db = getDb();
		const objectId = mongodb.ObjectId;
		return await db
			.collection("users")
			.findOne({ _id: new objectId(userId) });
	}
}
module.exports = User;
