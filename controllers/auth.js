exports.getLogin = (req, res, next) => {
	res.render("auth/login", {
		path: "/login",
		pageTitle: "Login",
		isAuthenticated: req.igLoggedIn,
		
	});
};
exports.postLogin = (req, res, next) => {
	req.igLoggedIn = true
	res.redirect('/')
};
