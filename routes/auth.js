const express = require("express");
const passport = require('passport');
const authRoutes = express.Router();
const User = require("../models/User");

const uploadCloud = require('../config/cloudinary');
const Recipes = require('../models/Recipe');
const {ensureLoggedIn} = require('../middleware/ensureLogin');


// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


authRoutes.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

authRoutes.post("/login", passport.authenticate("local", {
  successRedirect: "/auth/profile",
  failureRedirect: "/auth/login",
  failureFlash: true,
  passReqToCallback: true
}));

authRoutes.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

authRoutes.post("/signup", uploadCloud.single('photo'), (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  
  
  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);
    const newUser = new User({
      username,
      password: hashPass,
      email,
    });
  
    if (req.file){
      newUser.profilePic.path = req.file.secure_url;
      newUser.profilePic.originalName = req.file.original_filename;
    }

    newUser.save((err) => {
      if (err) {
        res.render("auth/signup", { message: "Something went wrong" });
      } else {
        res.redirect("/");
      }
    });
  });
});

authRoutes.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

//creamos la ruta del profile
authRoutes.get("/profile", ensureLoggedIn("/auth/informs"), (req,res,next)=>{
  Recipes.find({authorId: req.user._id})
    .then((recipes) => {
      res.render("auth/profile", {recipes})
    })
    .catch((err) => {
      console.log(err);
    })
});

authRoutes.get("/informs", (req, res) => {
  res.render("auth/informs");
});

module.exports = authRoutes;
