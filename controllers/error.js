exports.Error404 = (req, res, next) => {
			
			res.status(404).render("404", { pageTitle: "pages 404", path : req.path, isAuthenticated : req.session.isLoggedIn});
}