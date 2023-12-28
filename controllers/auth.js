const User = require("../models/user");
const bcrypt = require("bcryptjs");
exports.getLogin = (req, res, next) => {
	let msgError = req.flash('error')
	if(msgError.length >0){
		msgError = msgError[0]
	}else{
		msgError = null
	}
	// const cookieArr = req.get("Cookie").split(",");
	// let isLoggedIn = false;
	// cookieArr.forEach(cookies => {
	// 	let [key, value] = cookies.split("=");
	// 	if (value === "true") {
	// 		isLoggedIn = value;
	// 	}
	// });
	res.render("auth/login", {
		path: "/login",
		pageTitle: "Login",
		errMessage: msgError,
	});
};
exports.getSignup = (req, res, next) => {
	let msgError = req.flash('error')
	if(msgError.length >0){
		msgError = msgError[0]
	}else{
		msgError = null
	}
	res.render("auth/signup", {
		path: "/signup",
		pageTitle: "Signup",
		errMessage: msgError,
	});
};

exports.postLogin = async (req, res, next) => {
	// req.igLoggedIn = true
	// ** درواقع ما وقتی اینکار میکنیم با درتسور ریدایرکت این اطعلاعات به پایان مرسه و میمیره و دروافع انگار هیچ چیزی نیست که در اینجا کوکی هابه کمک ما می ایند
	// ست کردن کوکی ها =>
	// res.setHeader("Set-Cookie", "loggedIn=true;"); // بجای اینکه از کوکی ها استفاده کنیم میتونیم از سشن ها استفاده کنیم
	// const user = await User.findById("65873ba802bcb4165b0167a6"); /// ج
	// چون ما دیگ یک کاربر نداریم و یک احراز هویت  واقعی داریم پس بدیهی هست که از یک ایدی خاض نمیتوینم شخصی پیدا کنیم بلکه میتونیم از طریق ایمیل ااونو پیدا کنیم
	
	const email = req.body.email;
	const password = req.body.password;
	const user = await User.findOne({ email });
	console.log("hi");
	if (!user) {
		req.flash("error", "Invalid Email");
		return res.redirect("/login");
	}
	const matchPass = await bcrypt.compare(password, user.password);
	if (matchPass) {
		req.session.isLoggedIn = true;
		req.session.user = user;
		req.session.save();
		return res.redirect("/");
	}
	req.flash("error", "Invalid Password");
	res.redirect("/login");
	// res.redirect("/");
};
exports.postSignup = async (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	const confirmPassword = req.body.confirmPassword;
	const hashPass = await bcrypt.hash(password, 12);
	var user = await User.findOne({ email });
	if (user) {
		req.flash("error", "E-Mail exists already , please pick a different "); /// ایمیل از قبل وجود داشته
		return res.redirect("/signup");
	}
	user = await User.create({
		email,
		password: hashPass,
		cart: { items: [] },
	});
	console.log("created user");
	res.redirect("/login");
	return user.save();
};

exports.postLogout = (req, res, next) => {
	req.session.destroy(() => {
		res.redirect("/");
	});
};
