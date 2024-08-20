//import express
const express = require('express')

//init express router
const router = express.Router();

//import register controller
const AuthController = require('../controllers/AuthController');

//import validate register
const { validateRegister, validateLogin } = require('../utils/validators/auth');

//define route for register
router.post('/register', validateRegister, AuthController.register);

router.post('/login', validateLogin, AuthController.login);

//export router
module.exports = router