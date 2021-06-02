const {Router} = require('express');

const UserController = requiere('src/app/controllers/userController');
const AuthController = require('src/app/controllers/authController2');
const ProjectController = require('src/app/controllers/projectController');

const routes = newRouter();

​// UserController
routes.post('/users',UserController.create);

// AuthController
routes.post('/register',AuthController.create);
routes.post('/reset_password',AuthController.create);
routes.post('/forgot_password',AuthController.create);
routes.post('/authenticate',AuthController.create);

// ProjectController
routes.delete('/:projectId',ProjectController.create);
routes.put('/:projectId',ProjectController.create);
routes.post('/',ProjectController.create);
routes.get('/:projectId',ProjectController.create);


