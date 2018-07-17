const express = require ('express');
const passport = require ('passport');
const recipeRoutes = express.Router();
const Recipe = require('../models/Recipe');
const multer = require('multer');
const upload = multer({dest: '.public/upload/recipePic'});

recipeRoutes.get('/add', (req, res, next) => {
  res.render('recipes/new');
})


recipeRoutes.post('/add', upload.single('photo'), (req, res, next) => {
  console.log(req.user);
  console.log(req.body);

});

module.exports = recipeRoutes;