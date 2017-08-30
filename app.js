const fs = require('fs');
const path = require('path');
const express = require('express');
const mustacheExpress = require('mustache-express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Box = require("./models/box.js");

const DUPLICATE_RECORD_ERROR = 11000;

const mongoURL = 'mongodb://localhost:27017/mongooseSchema';
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

app.get('/',function(req,res){
  console.log("got to get/");
  res.render("index");
})

app.get('/new/',function(req,res){
  res.render("new");
})

app.post('/new/', function(req,res){
  Box.create(req.body)
  .then(function (box){
    res.redirect('/');
  })
  .catch(function (error) {
    let errorMsg;
    if (error.code === DUPLICATE_RECORD_ERROR) {
      errorMsg = `The box name "${req.body.name}" has already been used.`
    } else {
      errorMsg = "You have encountered an unknown error."
    }
    res.render('new', {errorMsg : errorMsg});
  })
})

app.listen(3000, function () {
	  console.log('Successfully started express application!');
})


// app.post('/new/', function (req, res) {
//   Recipe.create(req.body)
//   .then(function (recipe) {
//     res.redirect('/');
//   })
//   .catch(function (error) {
//     let errorMsg;
//     if (error.code === DUPLICATE_RECORD_ERROR) {
//       // make message about duplicate
//       errorMsg = `The recipe name "${req.body.name}" has already been used.`
//     } else {
//       errorMsg = "You have encountered an unknown error."
//     }
//     res.render('new_recipe', {errorMsg: errorMsg});
//   })
// });
