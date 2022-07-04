//=========================================================
// Dependencies
//=========================================================

const express = require('express');
const app = express();

const IndexController = require('./controller/index.controller.js');

//=========================================================
// Routes
//=========================================================

app.get('/', IndexController.getIndex);

module.exports = app;