const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	cart: {
		items: [
			{
				productId: {
					type: Schema.Types.ObjectId,
					ref: "Product",
					required: true,
				},
				quantity: { type: Number, required: true },
			},
		],
	},
});

userSchema.methods.clearCart = function(){
    this.cart = { items : []}
    return this.save()
}



userSchema.methods.removeFromCart =function (productId) {
	const updateCartItems = this.cart.items.filter(item => {
		return item.productId.toString() !== productId.toString();
	});
	this.cart.items = updateCartItems
    return this.save()
};

userSchema.methods.addToCart = async function (product) {
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
			productId: product._id,
			quantity: newQuantity,
		});
	}
	const updateCart = {
		items: updateCartItems,
	};
	this.cart = updateCart;
	return await this.save();
};
module.exports = mongoose.model("User", userSchema);
// const mongodb = require("mongodb");
// const getDb = require("../util/database").getDb;
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
// class User {
// 	constructor(username, email, cart, id) {
// 		this.name = username;
// 		this.email = email;
// 		this.cart = cart;
// 		this._id = id;
// 	}
// 	async save() {
// 		const db = getDb();
// 		return await db.collection("users").insertOne(this);
// 	}

// 	async addToCart(product) {
// 		const objectId = mongodb.ObjectId;
// 		if (!this.cart) {
// 			this.cart = { items: [] };
// 		}
// 		const cartProductIndex = this.cart.items.findIndex(cp => {
// 			return cp.productId.toString() === product._id.toString();
// 		});
// 		let newQuantity = 1;
// 		const updateCartItems = [...this.cart.items];
// 		if (cartProductIndex >= 0) {
// 			newQuantity = this.cart.items[cartProductIndex].quantity + 1;
// 			updateCartItems[cartProductIndex].quantity = newQuantity;
// 		} else {
// 			updateCartItems.push({
// 				productId: new objectId(product._id),
// 				quantity: newQuantity,
// 			});
// 		}
// 		const updateCart = {
// 			items: updateCartItems,
// 		};
// 		const db = getDb();
// 		return await db
// 			.collection("users")
// 			.updateOne(
// 				{ _id: new objectId(this._id) },
// 				{ $set: { cart: updateCart } }
// 			);
// 	}

// 	static async findById(userId) {
// 		const db = getDb();
// 		const objectId = mongodb.ObjectId;
// 		return await db
// 			.collection("users")
// 			.findOne({ _id: new objectId(userId) });
// 	}

// 	async getCart() {
// 		const db = getDb();
// 		const prodIds = this.cart.items.map(i => {
// 			return i.productId;
// 		});

// 		const products = await db
// 			.collection("products")
// 			.find({ _id: { $in: prodIds } })
// 			.toArray();

// 		return products.map(p => {
// 			const quantity = this.cart.items.find(
// 				i => i.productId.toString() === p._id.toString()
// 			).quantity;
// 			return { ...p, quantity: quantity };
// 		});
// 	}

// 	async deleteItemFromCart(prodId) {
// 		const updateCartItems = this.cart.items.filter(item => {
// 			return item.productId.toString() !== prodId.toString();
// 		});
// 		const db = getDb();
// 		const objectId = mongodb.ObjectId;
// 		return await db
// 			.collection("users")
// 			.updateOne(
// 				{ _id: new objectId(this._id) },
// 				{ $set: { cart: { items: updateCartItems } } }
// 			);
// 	}
// 	async addOrder() {
// 		const db = getDb();
// 		const objectId = mongodb.ObjectId;
// 		const products = await this.getCart()
// 		const order = await {
// 			items : products,
// 			user : {
// 				_id : new objectId(this._id),
// 				name : this.name,
// 			}
// 		}
// 		try {
// 			await db.collection("orders").insertOne(order);
// 			this.cart = await { items: [] };
// 			await db
// 				.collection("users")
// 				.updateOne(
// 					{ _id: new objectId(this._id) },
// 					{ $set: { cart: { items: [] } } }
// 				);
// 		} catch (err) {
// 			console.log(err);
// 		}
// 	}
// 	async getOrders(){
// 		const db = getDb()
// 		const objectId = mongodb.ObjectId;
// 		return await db.collection('orders').find({"user._id" :new objectId(this._id)}).toArray()
// 	}
// }
// module.exports = User;
