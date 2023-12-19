// Import required core modules
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const controllers404 = require("./controllers/error.js");
const mongoConnect = require("./util/database").connect;
app.set("view engine", "ejs");
app.set("views", "views");
const adminRoutes = require("./routes/admin.js");
const ShopRouter = require("./routes/shop.js");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
// app.use((req, res, next) => {
// 	User.findByPk(1)
// 		.then(user => {
// 			if (!user) {
// 				return res.status(404).send("User not found");
// 			}
// 			req.user = user;
// 			next();
// 		})
// 		.catch(err => {
// 			console.log(err);
// 			res.status(500).send("An error occurred");
// 		});
// });
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
