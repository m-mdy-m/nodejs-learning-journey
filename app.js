// Import required core modules
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const controllers404 = require("./controllers/error.js");
const db = require("./util/database.js");
app.set("view engine", "ejs");
app.set("views", "views");
const adminRoutes = require("./routes/admin.js");
const ShopRouter = require("./routes/shop.js");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/admin", adminRoutes);

db.execute("SELECT * FROM products")
	.then(result => {
		console.log(result[0], result[1]);
	})
	.catch(err => {
		console.log(err);
	});

app.use(ShopRouter);

app.use(controllers404.Error404);

app.listen(3000, () => {
	console.log("Server running on port 3000");
});
