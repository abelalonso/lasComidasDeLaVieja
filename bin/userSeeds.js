require("dotenv").config();
const User = require("../models/User");
const mongoose = require("mongoose");
const dburl = process.env.DBURL;
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

mongoose.connect(dburl,{useMongoClient: true});

const salt = bcrypt.genSaltSync(bcryptSalt);

const users = [
{
    username: "Admin",
    password: bcrypt.hashSync("Admin",bcryptSalt),
    email: "admin@gmail.com",
    active: true,
    profilePic: {
        path: "https://res.cloudinary.com/du4kngmkp/image/upload/v1531934243/lascomidasdelavieja/mario.jpg",
        originalName:"foto1.jpg"
    }
},

{
    username: "pepe",
    password: bcrypt.hashSync("pepe",bcryptSalt),
    email: "pepe@gmail.com",
    active: true,
    profilePic: {
        path: "https://res.cloudinary.com/du4kngmkp/image/upload/v1531934244/lascomidasdelavieja/rana.jpg",
        originalName:"foto2.jpg"
    }
},
{
    username: "abel",
    password: bcrypt.hashSync("abel",bcryptSalt),
    email: "abel@gmail.com",
    active: true,
    profilePic: {
        path: "https://res.cloudinary.com/du4kngmkp/image/upload/v1531934243/lascomidasdelavieja/gato.jpg",
        originalName:"foto2.jpg"
    }
},
]

User.create(users)
    .then((data)=>{
        console.log("data created")
        mongoose.disconnect()
    })
    .catch((error)=>{
        console.log("error creating database")
        mongoose.disconnect()
    })