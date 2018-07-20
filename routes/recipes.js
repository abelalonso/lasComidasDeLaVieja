const express = require ('express');
const recipeRoutes = express.Router();
const Recipe = require('../models/Recipe');
const Comment = require('../models/Comment');
const uploadCloud = require('../config/cloudinary');
const axios = require('axios');
const {ensureLoggedIn} = require('../middleware/ensureLogin');

recipeRoutes.get('/addRecipe', ensureLoggedIn("/auth/informs"), (req, res, next) => {
  res.render('recipes/newRecipe');
})


recipeRoutes.post('/addRecipe', uploadCloud.single('photo'), (req, res, next) => {
  const {name, elaborationTime, category } = req.body;
  const ingredients = [];
  const reqIngredient = req.body.ingredient;
  const reqQuantity = req.body.quantity;
  if (typeof reqIngredient == Object){

    ingredient=reqIngredient.filter((e)=>e!="");
    quantity=reqQuantity.filter((e)=>e!="");
    for (let i=0; i<ingredient.length; i++){
      ingredients.push(quantity[i]+' '+ingredient[i]);
    }
  }else{
    ingredients.push(quantity+' '+ingredient);
  }
  const reqSteps = req.body.step;
  if (typeof reqSteps == Object){steps=reqSteps.filter((e)=>e!="");}
  const reqKeywords = req.body.keyword;
  if (typeof reqKeywords == Object){keywords=reqKeywords.filter((e)=>e!="");}

  axios.get('https://api.punkapi.com/v2/beers/random')
  .then((beer) =>{
    createRecipe(beer.data[0]);
  })
  .catch((err) =>{
    createRecipe();
    console.log(err);
  })

  function createRecipe(beer){
    const recipeBeers = [];
    recipeBeers.push(beer);
    newRecipe = new Recipe({
      name: name.toUpperCase(),
      ingredients,
      steps,
      elaborationTime,
      category,
      keywords,
      recipeBeers,
      authorId: req.user._id,
    })

    if(req.file){
      newRecipe.recipePic.path = req.file.secure_url;
      newRecipe.recipePic.originalName = req.file.original_name;
    }

    newRecipe.save()
      .then(()=>{
        res.redirect("/auth/profile")
      })
      .catch((err)=>{
        console.log(err);
        res.render('recipes/newRecipe', {message: "something went wrong"})
      })
  }
});

recipeRoutes.get('/oneRecipe/:id', ensureLoggedIn("/auth/informs"), (req, res, next) => {
  Recipe.findById(req.params.id)
    .populate('authorId', 'username')
    .then((recipe) =>{
      Comment.find({recipeId: recipe._id})
        .populate('authorId')
        .then((comments) => {
          res.render('recipes/oneRecipe', {recipe, comments});
        })
    })
})

recipeRoutes.post('/addComment/:id', (req, res, next) => {

  const authorId = req.user._id;
  const content = req.body.message;
  const recipeId = req.params.id;
  const newComment = new Comment({authorId, content, recipeId});

  newComment.save()
    .then((comment)=>{
      console.log("Comment inserted properly");
      res.redirect(`/recipes/oneRecipe/${recipeId}`);
    })
    .catch((error) =>{
      console.log(error);
    })
})

recipeRoutes.post("/search", (req,res,next)=>{
  Recipe.find({$or: [{keywords: [req.body.search]}, 
    {name: new RegExp(req.body.search.toUpperCase())}]})
    .then((recipes) => {
      res.render("index", {user:req.user, recipes})
    })
    .catch((err) => {
      console.log(err);
    })
});

recipeRoutes.get("/delete/:id", (req,res,next)=>{
  Recipe.findByIdAndRemove(req.params.id)
    .then(()=>{
      res.redirect("/auth/profile")
    })
    .catch((err)=>{
      console.log(err);
    })
})

recipeRoutes.get("/edit/:id", (req,res,next)=>{
  Recipe.findById(req.params.id)
    .then((recipe)=>{
      res.render("recipes/editRecipe", {recipe})
    })
})

recipeRoutes.post("/edit/:id", uploadCloud.single("photo"), (req,res,next)=>{ 
  const {name, elaborationTime, category, recipeBeers} = req.body;
  const update = {name, elaborationTime, category, recipeBeers}
  const reqSteps = req.body.step;
  var ingredients=null;
  var steps=null;
  var keywords = null;
  if (typeof reqSteps == "object"){steps=reqSteps.filter((e)=>e!="");}
  const reqKeywords = req.body.keyword;
  if (typeof reqKeywords == "object"){keywords=reqKeywords.filter((e)=>e!="");}
  const reqIngredients = req.body.ingredient;
  if (typeof reqIngredients == "object"){ingredients=reqIngredients.filter(e=>e!="")}
  let newRecipe = {
    name: name.toUpperCase(),
    ingredients,
    steps,
    elaborationTime,
    category,
    keywords
  }
  if(req.file){
    newRecipe.recipePic = {
      path: req.file.secure_url,
      originalName: req.file.original_name
    };
  }

  Recipe.findByIdAndUpdate({_id:req.params.id}, newRecipe)
    .then(()=>{
      res.redirect("/auth/profile")
    })
    .catch((err)=>{
      console.log(err);
    })
});

module.exports = recipeRoutes;
