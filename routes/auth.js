const express = require("express");
const authController = require("../controllers/auth");
const { check, body } = require("express-validator");
const router = express.Router();
const User = require("../models/user");
router.get("/login", authController.getLogin);

router.get("/signup", authController.getSignup);

router.post("/login", authController.postLogin);

router.post(
	"/signup",
	[
		check("email")
			.isEmail()
			.withMessage("Please enter valid Email")
			.custom(async (value, { req }) => {
				// if (value === "test@gmail.com") {
				// 	throw new Error("this email address Errr");
				// }
				// return true;
				var user = await User.findOne({ email: value });
				if (user) {
					return Promise.reject('E-Mail exists already , please pick a different')
				}
			}),
		body("password", "Pleas enter a password with only least 5 char")
			.isLength({
				min: 5,
			})
			.isAlphanumeric(),
		body("confirmPassword").custom((value, { req }) => {
			if (value !== req.body.password) {
				throw new Error("Password have to match!");
			}
			return true;
		}),
	],
	// داخل یک ارایه انداختن واجب نیست ولی خوانایی بهتری داره
	authController.postSignup
);

router.post("/logout", authController.postLogout);

router.get("/rest", authController.getReset);

router.post("/reset", authController.postReset);

router.get("/reset/:token", authController.getNewPassword);

router.post("/new-password", authController.postNewPassword);

module.exports = router;
