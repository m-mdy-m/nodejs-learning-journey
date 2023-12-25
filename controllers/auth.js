exports.getLogin = (req, res, next) => {
	const cookieArr = req.get("Cookie").split(",");
	let isLoggedIn = false;
	cookieArr.forEach(cookies => {
		let [key, value] = cookies.split("=");
		if (value === "true") {
			isLoggedIn = value;
		}
	});
};
exports.postLogin = (req, res, next) => {
	// req.igLoggedIn = true
	// ** درواقع ما وقتی اینکار میکنیم با درتسور ریدایرکت این اطعلاعات به پایان مرسه و میمیره و دروافع انگار هیچ چیزی نیست که در اینجا کوکی هابه کمک ما می ایند
	// ست کردن کوکی ها =>
	res.setHeader("Set-Cookie", "loggedIn=true");
	res.redirect("/");
};
