require('dotenv').load();
require("dotenv").config();
const User = require("../models/User");
const Recipe = require("../models/Recipe")
const mongoose = require("mongoose");
const dburl = process.env.DBURL;
const axios = require('axios');
var userId = null;

mongoose.connect(dburl, {
    useMongoClient: true
});

User.findOne({
        username: "Admin"
    })
    .then((user) => {
        userId = user._id;
/*         axios.get('https://api.punkapi.com/v2/beers/random')
            .then((beer) => {
                recipeBeers = [];
                recipeBeers.push(beer); */
                const recipes = [{
                    name: "CALAMARES EN SU TINTA",
                    authorId: userId,
                    ingredients: ["350 gr de cebolla",
                        "3 dientes de ajo",
                        "50 gr de aceite de oliva",
                        "100 gr de tomate triturado",
                        "1000 gr de calamares en trozos o en aros",
                        "3 bolsitas de tinta de calamar",
                        "100 gr de vino blanco",
                        "100 gr de brandy",
                        "1 cucharadita de sal",
                        "Una pizca de pimienta"
                    ],
                    steps: [
                        "Ponga en el vaso la cebolla y el ajo, y programe 4 seg, vel 5. Vuelque en el cestillo para que suelte el agua y reserve.",
                        "Sin lavar el vaso ponga el aceite y programe 6 min, varoma, vel 1.",
                        "Añada la cebolla y los ajos reservados. Programe 10 min, varoma, vel cuchara con giro a la izquierda.",
                        "Incorpore el tomate y programe 10 min, varoma vel cuchara con giro a la izquierda.",
                        "Agregue los calamares y rehogue programando 5 min, varoma, vel cuchara con giro a la izquierda.",
                        "Añada la tinta, el brandy y el vino y la sal y la pimienta y programe 30 min, varoma, vel cuchara con giro a la izquierda.",
                        "Compruebe que los calamares estén tiernos, de no ser así puede programar unos minutos más a la misma velocidad y temperatura."
                    ],
                    elaborationTime: "1h 20min",
                    category: "Principal",
                    keywords: ["calamares"],
        //            recipeBeers,
                    recipePic: {
                        path: "upload/recipePic/calamares.jpg",
                        originalName: "foto1.jpg"
                    }
                }]
                console.log(recipes[0].recipeBeers)
                Recipe.create(recipes)
                    .then((data) => {
                        console.log("Recipes inserted");
                        mongoose.disconnect();
                    })
                    .catch((err) => {
                        console.log("Error inserting recipes");
                        mongoose.disconnect();
                    })
            })
            .catch((err) =>{
                console.log(err)
            })
/*     })
    .catch((err) =>{
        console.log(err)
    }) */