exports.getLogin = (req, res, next) => {
	res.render("auth/login", {
		path: "/login",
		pageTitle: "Login",
		isAuthenticated: req.igLoggedIn,
		
	});
};
exports.postLogin = (req, res, next) => {
	// req.igLoggedIn = true
	 // ** درواقع ما وقتی اینکار میکنیم با درتسور ریدایرکت این اطعلاعات به پایان مرسه و میمیره و دروافع انگار هیچ چیزی نیست که در اینجا کوکی هابه کمک ما می ایند
	 // ست کردن کوکی ها =>
	 res.setHeader("Set-Cookie", 'loggedIn=true')
	res.redirect('/')
};
