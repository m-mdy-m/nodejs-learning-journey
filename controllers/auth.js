exports.getLogin = (req, res, next) => {
	res.render("auth/login", {
		path: "/login",
		pageTitle: "Login",
	});
};
exports.postLogin = (req, res, next) => {
	res.redirect('/')
};
