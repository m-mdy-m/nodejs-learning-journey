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
	constructor(username, email) {
		this.name = username;
		this.email = email;
	}
	async save() {
		const db = getDb();
		
	}
	static findById(userId) {}
}
