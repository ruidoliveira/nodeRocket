const express = require('express');
const routes = require('./routers')
require('../src/infra/database/mongo')
class App {
  constructor() {
    this.server = express();
    this.routes();
  }

  routes() {
    this.server.use(routes);
  }
}

module.exports = new App().server;
