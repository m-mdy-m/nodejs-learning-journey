// Import required core modules
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const controllers404 = require("./controllers/error.js");
const sequelize = require("./util/database.js");
// Models
const Product = require("./models/product.js");
const User = require("./models/user.js");
const Cart = require("./models/cart.js");
const CartItem = require("./models/cart-item.js");
const Order = require("./models/order.js");
const OrderItem = require("./models/order-item.js");
app.set("view engine", "ejs");
app.set("views", "views");
const adminRoutes = require("./routes/admin.js");
const ShopRouter = require("./routes/shop.js");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
	User.findByPk(1)
		.then(user => {
			if (!user) {
				return res.status(404).send("User not found");
			}
			req.user = user;
			next();
		})
		.catch(err => {
			console.log(err);
			res.status(500).send("An error occurred");
		});
});
app.use("/admin", adminRoutes);

app.use(ShopRouter);

app.use(controllers404.Error404);
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);

User.hasOne(Cart);
Cart.belongsTo(User);

Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

Order.belongsTo(User)
User.hasMany(Order)
Order.belongsToMany(Product , {through : OrderItem})


sequelize
	.sync()
	// .sync({force : true}) // یعنی تغییراتی که انجام دادم اعمال شه
	.then(result => {
		return User.findByPk(1);
		// console.log(result);
	})
	.then(user => {
		if (!user) {
			return User.create({ name: "mahdi", email: "mahdi@gmail.com" });
		}
		return Promise.resolve(user);
	})
	.then(user => {
		return user.createCart();
	})
	.then(cart => {
		app.listen(3000, () => {
			console.log("Server running on port 3000");
		});
	})
	.catch(err => {
		console.log(err);
	});
