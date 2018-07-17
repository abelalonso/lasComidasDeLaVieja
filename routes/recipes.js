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
  const {name, elaborationTime, category, } = req.body;
  const ingredients = [];
  const ingredient = req.body.ingredient;
  const quantity = req.body.quantity;
  const steps = req.body.step;
  const keywords = req.body.keyword;
  for (let i=0; i<ingredient.length; i++){
    ingredients.push(quantity[i]+' '+ingredient[i]);
  }
  const userId = req.user.name;
  const path = `upload/recipePic/${req.file.filename}`;
  const originalName = req.file.originalname;
  newRecipe = new Recipe({
    name,
    ingredients,
    steps,
    elaborationTime,
    category,
    keywords,
    authorId: req.user.name,
    recipePic: {path, originalName}
  });
  newRecipe.save()
    .then(()=>{
      res.redirect("/auth/profile")
    })
    .catch((err)=>{
      res.render('recipes/add', {message: "something went wrong"})
    })
});

module.exports = recipeRoutes;