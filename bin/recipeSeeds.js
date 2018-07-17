require("dotenv").config();
const User = require("../models/User");
const Recipe = require("../models/Recipe")
const mongoose = require("mongoose");
const dburl = process.env.DBURL;


mongoose.connect(dburl,{useMongoClient: true});

User.findOne({username:"Admin"})
.then((user)=>{
    var userId = User._Id; 
})

const recipes = [
{
    
}



]
