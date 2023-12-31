const User = require("../models/user");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
var transport = nodemailer.createTransport({
	host: "sandbox.smtp.mailtrap.io",
	port: 2525,
	auth: {
		user: "7d555598001454",
		pass: "745c69e3e0c996",
	},
});
exports.getLogin = (req, res, next) => {
	let msgError = req.flash("error");
	if (msgError.length > 0) {
		msgError = msgError[0];
	} else {
		msgError = null;
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
	let msgError = req.flash("error");
	if (msgError.length > 0) {
		msgError = msgError[0];
	} else {
		msgError = null;
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
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors.array()[0].msg);
		return res.status(422).render("auth/signup", {
			path: "/signup",
			pageTitle: "Signup",
			errMessage: errors.array()[0].msg,
		});
	}
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
exports.getReset = (req, res, nxt) => {
	let msgError = req.flash("error");
	if (msgError.length > 0) {
		msgError = msgError[0];
	} else {
		msgError = null;
	}
	res.render("auth/reset", {
		path: "/rest",
		pageTitle: "REST PASSWORD",
		errMessage: msgError,
	});
};
exports.postReset = (req, res, nxt) => {
	const email = req.body.email;
	crypto.randomBytes(32, async (err, buffer) => {
		if (err) {
			console.log(err);
			return res.redirect("/reset");
		}
		const token = buffer.toString("hex");
		const user = await User.findOne({ email });
		if (!user) {
			res.flash("error ", "No Account with Email");
			return res.redirect("/reset");
		}
		console.log("token=>", token);
		user.resetToken = token;
		user.resetTokenExpiration = Date.now() + 3600000;
		await user.save();
		await transport.sendMail({
			from: "mahdimamashli1383@gmail.com",
			to: email,
			subject: "Password Reset",
			html: `<a href="http://localhost:3000/reset/${token}">click</a>`,
		});
		res.redirect("/");
	});
};
exports.getNewPassword = async (req, res, nxt) => {
	const token = req.params.token;
	const user = await User.findOne({
		resetToken: token,
		resetTokenExpiration: { $gt: Date.now() },
	});
	let msgError = req.flash("error");
	if (msgError.length > 0) {
		msgError = msgError[0];
	} else {
		msgError = null;
	}
	res.render("auth/new-password", {
		path: "/new-password",
		pageTitle: "NEW PASSWORD",
		errMessage: msgError,
		userId: user._id.toString(),
		passwordToken: token,
	});
};
exports.postNewPassword = async (req, res, nxt) => {
	const newPass = req.body.password;
	const userId = req.body.userId;
	const passwordToken = req.body.passwordToken;
	const user = await User.findOne({
		resetToken: passwordToken,
		resetTokenExpiration: { $gt: Date.now() },
		_id: userId,
	});
	const hashedPass = await bcrypt.hash(newPass, 12);
	user.password = hashedPass;
	user.resetToken = undefined;
	user.resetTokenExpiration = undefined;
	await user.save();
	res.redirect("/login");
};
