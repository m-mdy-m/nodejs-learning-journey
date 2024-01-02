exports.Error404 = (req, res, next) => {
			res.status(404).render("404", { pageTitle: "pages 404", path : req.path, isAuthenticated : req.session.isLoggedIn});
}
exports.Error500 = (req, res, next) => {
	res.status(500).render("500", { pageTitle: "pages 500", path : req.path, isAuthenticated : req.session.isLoggedIn});
}