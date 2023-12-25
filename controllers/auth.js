exports.getLogin = (req, res, next) => {
	// const cookieArr = req.get("Cookie").split(",");
	// let isLoggedIn = false;
	// cookieArr.forEach(cookies => {
	// 	let [key, value] = cookies.split("=");
	// 	if (value === "true") {
	// 		isLoggedIn = value;
	// 	}
	// });
	console.log(req.session.isLoggedIn);
	res.render("auth/login", {
		path: "/login",
		pageTitle: "Login",
		isAuthenticated: false,
	});
};
exports.postLogin = (req, res, next) => {
	// req.igLoggedIn = true
	// ** درواقع ما وقتی اینکار میکنیم با درتسور ریدایرکت این اطعلاعات به پایان مرسه و میمیره و دروافع انگار هیچ چیزی نیست که در اینجا کوکی هابه کمک ما می ایند
	// ست کردن کوکی ها =>
	// res.setHeader("Set-Cookie", "loggedIn=true;"); // بجای اینکه از کوکی ها استفاده کنیم میتونیم از سشن ها استفاده کنیم
	req.session.isLoggedIn = true
	res.redirect("/");
};
