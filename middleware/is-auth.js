module.exports = (req, res, nxt) => {
	if (!req.session.isLoggedIn) {
		return res.redirect("/login");
	}
	nxt();
};
