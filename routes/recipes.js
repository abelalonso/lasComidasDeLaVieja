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
  const name = req.body.name;
  const authorId = req.user._id;
  const ingredients = req.body.ingredient;
  const steps = req.body.step;
  const category = req.body.category;
  const keywords = req.body.keyword;
  const path = `upload/recipePic/${req.file.filename}`;
  const originalName = req.file.originalname;

  const newRecipe = new Recipe({
    name,
    authorId,
    ingredients,
    steps,
    category,
    keywords,
    recipePic: {path, originalName}
    
    
    })
    console.log(newRecipe)
   
    newRecipe.save()
      .then(rec=>{
console.log(rec )
        res.redirect("/auth/profile")
      })
      .catch((err)=>{
        console.log(err)
        res.render("recipes/new", {message: "An error has ocurred"})
      })
      })
 
 




module.exports = recipeRoutes;