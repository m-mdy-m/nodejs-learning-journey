// const Sequelize = require("sequelize");
// const sequelize = require("../util/database");
// const Order = sequelize.define("order", {
// 	id: {
// 		type: Sequelize.INTEGER,
// 		autoIncrement: true,
// 		primaryKey: true,
// 		allowNull: false,
// 	},
// });
// module.exports = Order;
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
	products: [
		{
			productData: { type: Object, required: true },
			quantity: { type: Number, required: true },
		},
	],
	user: {
		name: {
			type: String,
			required: true,
		},
		userId: {
			type: Schema.type.ObjectId,
			required: true,
			ref: "User",
		},
	},
});


module.exports = mongoose.model("Order", orderSchema)