// Import required core modules
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const controllers404 = require("./controllers/error.js");
const session = require("express-session");
const csrf = require('csurf')
const flash = require('connect-flash')
// const mongoConnect = require("./util/database").connect;

const MongoDBStore = require("connect-mongodb-session")(session);
const mongoose = require("mongoose");
const User = require("./models/user.js");

const MONGODB_URL = "mongodb://localhost:27017/shop";

const store = new MongoDBStore({
	uri: MONGODB_URL,
	collection: "sessions",
});
const csrfProtection = csrf()
app.set("view engine", "ejs");
app.set("views", "views");
const adminRoutes = require("./routes/admin.js");
const ShopRouter = require("./routes/shop.js");
const authRoute = require("./routes/auth.js");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
	session({
		secret: "my secret",
		resave: false,
		saveUninitialized: false,
		store: store,
	})
);
app.use(flash())
app.use(csrfProtection)
// app.use(async (req, res, next) => {
// 	try {
// 		const user = await User.findById("65873ba802bcb4165b0167a6");
// 		if (!user) {
// 			return res.redirect("/");
// 		}
// 		// req.user = user;
// 		req.user = user;
// 		next();
// 	} catch (err) {
// 		console.log(err);
// 	}
// });
app.use((req,res,nxt)=>{
	res.locals.isAuthenticated = req.session.isLoggedIn
	res.locals.csrfToken = req.csrfToken()
	nxt()
})
app.use(async (req, res, nxt) => {
	if (req.session.user) {
		const user = await User.findById(req.session.user._id);
		if (!user) return res.redirect("/login")
		req.user = user;
		nxt();
	} else {
		return nxt();
	}
	// const user = await User.findById("65873ba802bcb4165b0167a6");
});



app.use("/admin", adminRoutes);

app.use(ShopRouter);
app.use(authRoute);
app.use(controllers404.Error404);
app.use('/500',controllers404.Error500);

// const start = async () => {
// 	try {
// 		await mongoConnect();
// 		console.log("connect data base");
// 		app.listen(3000, () => {
// 			console.log("run server on port 3000");
// 		});
// 	} catch (err) {
// 		console.error("Failed to connect to the database:", err);
// 	}
// };
// start();
const start = async () => {
	try {
		await mongoose.connect(MONGODB_URL);
		console.log("connect database");

		app.listen(3000, () => {
			console.log("run server on port 3000");
		});
	} catch (error) {
		console.log(error);
	}
};
start();
