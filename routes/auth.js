const express = require("express");
const passport = require('passport');
const authRoutes = express.Router();
const User = require("../models/User");
const multer = require("multer");
const upload = multer({ dest: './public/upload/profilePic' });
const Recipes = require('../models/Recipe');


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

authRoutes.post("/signup", upload.single('photo'), (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const path = `upload/profilePic/${req.file.filename}`;
  const originalName = req.file.originalname;
  
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
      profilePic: {path,originalName}
    });
  

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
authRoutes.get("/profile", (req,res,next)=>{
  Recipes.find({authorId: req.user._id})
    .then((recipes) => {
      res.render("auth/profile", {user:req.user, recipes})
    })
    .catch((err) => {
      console.log(err);
    })
});

module.exports = authRoutes;
