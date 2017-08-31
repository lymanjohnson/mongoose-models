const fs = require('fs');
const path = require('path');
const express = require('express');
const mustacheExpress = require('mustache-express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Box = require("./models/box.js");

const DUPLICATE_RECORD_ERROR = 11000;

const mongoURL = 'mongodb://localhost:27017/boxdb';
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
  Box.find().then(function(box){
    res.render("index",{box:box});
  })
})

app.get('/new/',function(req,res){
  res.render("new");
})

/*
Recipe.findOne({_id: req.params.id}).then(function (recipe) {
  recipe.steps.push(req.body.step);
  recipe.save().then(function () {
    res.render("new_step", {recipe: recipe});
*/

app.post('/new/', function (req, res) {
  Box.create(req.body)
  .then(function (box) {
    Box.findOneAndUpdate({name: req.params.name},{$push: {contents: {req.params.contentsItem,req.params.contentsQuantity}}})
    .then(
      res.redirect('/')
    )

    // var newContent = {"item": req.body.contentsItem, "quantity": req.body.contentsQuantity};
    // console.log(req.body.contentsItem,req.body.contentsQuantity);
    // console.log(newContent);
    // boxes.findOneAndUpdate({name: req.user.name}, {$push: {contents: newContent}});
    // res.redirect('/');
  })
  .catch(function (error) {
    let errorMsg;
    if (error.code === DUPLICATE_RECORD_ERROR) {
      // make message about duplicate
      errorMsg = `The recipe name "${req.body.name}" has already been used.`
    } else {
      errorMsg = "You have encountered an unknown error."
    }
    res.render('new', {errorMsg: errorMsg});
  })
});

app.listen(3000, function () {
	  console.log('Successfully started express application!');
})

module.exports = app;

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
