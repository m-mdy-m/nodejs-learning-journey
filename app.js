// Import required core modules
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const controllers404 = require("./controllers/error.js");
const mongoConnect = require("./util/database").connect;

const User = require("./models/user.js");

app.set("view engine", "ejs");
app.set("views", "views");
const adminRoutes = require("./routes/admin.js");
const ShopRouter = require("./routes/shop.js");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(async (req, res, next) => {
	try {
		const user = await User.findById('6582af67207864914b6fd6ab');
		if (!user) {
			return res.redirect('/')
		}
		req.user = user;
		next();
	} catch (err) {
		console.log(err);
	}
});
app.use("/admin", adminRoutes);

app.use(ShopRouter);

app.use(controllers404.Error404);

const start = async () => {
	try {
		await mongoConnect();
		console.log("connect data base");
		app.listen(3000, () => {
			console.log("run server on port 3000");
		});
	} catch (err) {
		console.error("Failed to connect to the database:", err);
	}
};
start();
