const express = require ('express');
const passport = require ('passport');
const recipeRoutes = express.Router();
const Recipe = require('../models/Recipe');
const multer = require('multer');
const upload = multer({dest: './public/upload/recipePic'});

recipeRoutes.get('/add', (req, res, next) => {
  res.render('recipes/new');
})


recipeRoutes.post('/add', upload.single('photo'), (req, res, next) => {
  const {name, elaborationTime, category, } = req.body;
  const ingredients = [];
  const ingredient = req.body.ingredient;
  if (ingredient[ingredient.length-1] ==""){ingredient.pop()}
  const quantity = req.body.quantity;
  if (quantity[quantity.length-1] ==""){quantity.pop()}
  const steps = req.body.step;
  if (steps[steps.length-1] ==""){steps.pop()}
  const keywords = req.body.keyword;
  if (keywords[keywords.length-1] ==""){keywords.pop()}
  for (let i=0; i<ingredient.length; i++){
    ingredients.push(quantity[i]+' '+ingredient[i]);
  }
  const path = `upload/recipePic/${req.file.filename}`;
  const originalName = req.file.originalname;
  newRecipe = new Recipe({
    name,
    ingredients,
    steps,
    elaborationTime,
    category,
    keywords,
    authorId: req.user._id,
    recipePic: {path, originalName}
  });
  console.log(newRecipe)
  newRecipe.save()
    .then(()=>{
      res.redirect("/auth/profile")
    })
    .catch((err)=>{
      console.log(err);
      res.render('recipes/new', {message: "something went wrong"})
    })
});

module.exports = recipeRoutes;