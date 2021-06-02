const express = require('express');
const routes = require('./routers')

class App {
  constructor() {
    this.server = express();
    this.routes();
  }

  routes() {
    routes(this.express)
  }
}

module.exports = new App().server;
