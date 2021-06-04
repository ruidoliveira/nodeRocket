const { Router } = require('express');

const UserController = require('../app/controllers/userController');
const AuthController = require('../app/controllers/authController');
const ProjectController = require('../app/controllers/projectController');

const routes = new Router();

module.exports = () => {

  routes.get('/OK', (req, res)=>
  res.json('ok')
  )


  // UserController
  routes.post('/user', UserController.create);
  routes.get('/user/find', UserController.find);

  // AuthController
  routes.post('/auth/reset_password', AuthController.resetPassword);
  routes.post('/auth/forgot_password', AuthController.forgotPassword);
  routes.post('/auth/authenticate', AuthController.login);

  // ProjectController
  routes.delete('/project/:projectId', ProjectController.delete);
  routes.put('/project/:projectId', ProjectController.update);
  routes.post('/project/', ProjectController.create);
  routes.get('/project/:projectId', ProjectController.findProjectById);

}


