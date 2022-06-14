const userRoutes = require('express').Router();
const AuthController = require('../controllers/Auth.controller');

userRoutes.post('/register', AuthController.register);
userRoutes.post('/login', AuthController.login);

module.exports = userRoutes;
