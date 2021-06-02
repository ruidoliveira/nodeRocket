const {Router} = require('express');

const UserController = requiere('src/app/controllers/userController');

const AuthController = require('src/app/controllers/authController2.js';)

const routes=newRouter();
​
routes.post('/users',UserController.create);

routes.post('/register',AuthController.create);
