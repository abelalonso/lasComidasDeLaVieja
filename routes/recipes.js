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
  const quantity = req.body.quantity;
  if (typeof ingredient == Object){
    console.log(ingredient);
    ingredient.filter((e)=>e!="");
    quantity.filter((e)=>e!="");
    for (let i=0; i<ingredient.length; i++){
      ingredients.push(quantity[i]+' '+ingredient[i]);
    }
  }else{
    ingredients.push(quantity+' '+ingredient);
  }
  const steps = req.body.step;
  if (typeof steps == Object){steps.filter((e)=>e!="");}
  const keywords = req.body.keyword;
  if (typeof keywords == Object){keywords.filter((e)=>e!="");}
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


recipeRoutes.get('/oneRecipe/:id', (req, res, next) => {

  Recipe.findById(req.params.id)
    .populate('authorId', 'username')
    .then((recipe) =>{
      console.log(recipe)
      res.render('recipes/oneRecipe', recipe);
    })
})

module.exports = recipeRoutes;