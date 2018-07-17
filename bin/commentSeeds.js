require("dotenv").config();
const User = require("../models/User");
const Recipe = require("../models/Recipe")
const mongoose = require("mongoose");
const dburl = process.env.DBURL;
const Comment = require("../models/Comment")
var userId = null;
var recipeId = null;
mongoose.connect(dburl,{useMongoClient: true});

User.findOne({username:"abel"})
.then((user)=>{
    userId = user._id; 
    Recipe.findOne({name:"CALAMARES EN SU TINTA"})
        .then((recipe)=>{
            recipeId = recipe._id
            const comments = [
                {
                    content: "Esto está muy rico",
                    authorId: userId,
                    recipeId: recipeId

                },
                {
                    content: "Magnífico",
                    authorId: userId,
                    recipeId: recipeId

                },
                {
                    content: "Delicious",
                    authorId: userId,
                    recipeId: recipeId

                }
            ]
            Comment.create(comments)
                .then((data)=>{
                    console.log("comments created")
                    mongoose.disconnect()
                })
                .catch((err)=>{
                    console.log("error creating comment")
                    mongoose.disconnect()
                })
        })

    })

