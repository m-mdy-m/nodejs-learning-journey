
const express = require("express");
const authController = require('../controllers/auth')
const { check } = require('express-validator')
const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login', authController.postLogin);

router.post('/signup',check('email').isEmail(), authController.postSignup);

router.post('/logout', authController.postLogout);


router.get('/rest', authController.getReset)

router.post('/reset', authController.postReset)


router.get('/reset/:token', authController.getNewPassword)

router.post('/new-password',authController.postNewPassword)

module.exports = router