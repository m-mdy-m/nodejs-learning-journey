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
		const objectId = mongodb.ObjectId;
		if (!this.cart) {
			this.cart = { items: [] };
		}
		const cartProductIndex = this.cart.items.findIndex(cp => {
			return cp.productId.toString() === product._id.toString();
		});
		let newQuantity = 1;
		const updateCartItems = [...this.cart.items];
		if (cartProductIndex >= 0) {
			newQuantity = this.cart.items[cartProductIndex].quantity + 1;
			updateCartItems[cartProductIndex].quantity = newQuantity;
		} else {
			updateCartItems.push({
				productId: new objectId(product._id),
				quantity: newQuantity,
			});
		}
		const updateCart = {
			items: updateCartItems,
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

	async getCart(){
		const db = getDb()
		const prodId = this.cart.items.map(i =>{
			return i.productId
		})
		const products = await db.collection('products').find({_id : {$in : prodId}}).toArray()
		return products.map(p=>{
			return {...p,quantity:this.cart.items.find(i =>{
				return i.productId.toString() === p._id.toString();
			})}.quantity
		})
	}

	deleteItemFromCart(){
		
	}
}
module.exports = User;
