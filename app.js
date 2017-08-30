const fs = require('fs');
const path = require('path');
const express = require('express');
const mustacheExpress = require('mustache-express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Box = require("./models/box.js");

const DUPLICATE_RECORD_ERROR = 11000;

const mongoURL = 'mongodb://localhost:27017/recipes';
mongoose.connect(mongoURL, {useMongoClient: true});
mongoose.Promise = require('bluebird');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.engine('mustache', mustacheExpress());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'mustache');

/*  WHAT ARE THESE?  */

// app.set('layout', 'layout');
// app.use('/static', express.static('static'));

/*                   */

app.use(express.static(__dirname + '/public'));

app.get('/new/',function{
  res.render("new");
})
