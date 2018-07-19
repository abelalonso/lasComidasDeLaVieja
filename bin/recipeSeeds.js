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
         axios.get('https://api.punkapi.com/v2/beers')
            .then((beer) => {
                let beer0=[]
                beer0.push(beer.data[0]);
                let beer1=[]
                beer1.push(beer.data[1]);
                let beer2=[]
                beer2.push(beer.data[2]);
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
                    recipeBeers: beer0,
                    recipePic: {
                        path: "https://res.cloudinary.com/du4kngmkp/image/upload/v1531934251/lascomidasdelavieja/calamares.jpg",
                        originalName: "foto1.jpg"
                    }
                },
                {
                    name: "CLASSIC DINNER'S ROLL",
                    authorId: userId,
                    ingredients: ["1 paquete levadura fresca panadero",
                        "60 ml. agua tibia (40º-46º)",
                        "250 ml. leche entera",
                        "2 cucharadas azúcar",
                        "2 huevos grandes",
                        "90 gr. mantequilla sin sal a temperatura ambiente",
                        "700 gr. harina fuerza",
                        "100 gr de brandy",
                        "2 cucharaditas sal"
                    ],
                    steps: [
                        "Disolver la levadura en un bol con el agua.",
                        "Dejarlo reposar hasta que forme espuma, aproximadamente 5 -10 minutos.",
                        "Calentar un poco la leche y derretir en ella la mantequilla, añadir los huevos batidos y el azúcar.",
                        "En el bol de la KitchenAid incorporé la harina con la sal (me reservé un par de cucharadas de harina) y le añadí la mezcla del agua con la levadura.",
                        "A velocidad baja añadí lentamente, en tres veces, la leche mezclada con el resto de los ingredientes.",
                        "Añadir poco a poco, las dos cucharadas de harina que teníamos reservadas en caso de necesitarlas, hasta conseguir que la pasta se despegue de las paredes del bol y se pegue al gancho amasador.",
                        "Amasar durante 5-7 minutos, o hasta que consigamos una masa suave y elástica. La masa deberá ser blandita pero no pegajosa.",
                        "Retirar la masa y hacer una bola y dejarla levar durante 90 minutos, o hasta que haya doblado el volumen",
                        "Pasado este tiempo desgasificar la masa y cortarla en dos. Cada una de estas mitades cortarla en otros cuatro trozos, todos iguales. En total tendremos 8 trocitos.",
                        "Cogeremos un trocito de masa y lo pondremos en la palma de una mano. Con la otra mano trabajaremos la masa hasta conseguir una bolita.",
                        "Enmantecar un molde redondo de 28 cm. y cubrir la base con papel de hornear.",
                        "Colocar en el molde las bolitas de masa separadas y dejar levar durante 35 -40 minutos.",
                        "Cuando la masa haya levado, pintarla con mantequilla derretida e introducir en el horno precalentado a horno a 200º durante 20-25 minutos.",
                        "Si vemos que a mitad de cocción se dora demasiado la parte superior, cubrir con papel de aluminio.",
                        "Servir inmediatamente."
                    ],
                    elaborationTime: "1h 40min",
                    category: "Entrante",
                    keywords: ["dinners", "pan"],
                    recipeBeers: beer1,
                    recipePic: {
                        path: "https://res.cloudinary.com/du4kngmkp/image/upload/v1531983316/lascomidasdelavieja/dinners_roll.jpg",
                        originalName: "dinners.jpg"
                    }
                },
                {
                    name: "MOJITO DE FRESA",
                    authorId: userId,
                    ingredients: ["100 gr de fresas",
                        "60	gr de azúcar",
                        "50	gr de ron",
                        "200 gr hielo",
                        "Zumo de medio limón"
                    ],
                    steps: [
                        "Poner todos los ingredientes, menos el hielo en el vaso, 30 segundos, vel 5.",
                        "Cuando pare añadir los cubitos vel progresiva 5-7-10, hasta que veamos que está bien granizado.",
                        "Servimos en el momento."
                    ],
                    elaborationTime: "10 min",
                    category: "Bebida",
                    keywords: ["alcohol", "bebida", "ron"],
                    recipeBeers: [],
                    recipePic: {
                        path: "https://res.cloudinary.com/du4kngmkp/image/upload/v1531983815/lascomidasdelavieja/mojito.jpg",
                        originalName: "mojito.jpg"
                    }
                },
                {
                    name: "TARTA BANOFFEE",
                    authorId: userId,
                    ingredients: ["200 gr de galletas digestive",
                        "80 gr de mantequilla",
                        "1 cda de canela",
                        "4 platanos",
                        "200-250 gr de dulce de leche",
                        "200 gr de nata",
                        "100 gr de queso para untar o mascarpone",
                        "120 gr de azucar glass",
                        "2 cucharaditas sal",
                        "Granillo de almendra crocanti y virutas de chocolate negro-blanco (para DECORAR)"
                    ],
                    steps: [
                        "Trituramos las galletas con la ayuda de un robot con accesorio picador,colocamos las galletas en un bol y le añadimos la mantequilla y la canela.",
                        "Mezclamos bien y procedemos a tapar nuestro molde con la base de galletas.Dejamos 30 min en el congelador para que endurezca.",
                        "Cortamos nuestros plátanos del grosor que queramos,sacamos nuestro molde del congelador y se lo añadimos a la base de galletas.",
                        "Ahora le toca el turno al dulce de leche y lo extendemos bien por todo el plátano.",
                        "Montamos la nata con el azúcar y la extendemos por encima del dulce de leche.",
                        "Decoramos con el granillo de almendra crocanti y las virutas de 2 chocolates mezcladas y dejamos reposar la tarta en la nevera toda la noche.",
                        "Servimos y lista para degustar."
                    ],
                    elaborationTime: "1h 10min",
                    category: "Postre",
                    keywords: ["dulce", "plátano", "leche"],
                    recipeBeers: beer2,
                    recipePic: {
                        path: "https://res.cloudinary.com/du4kngmkp/image/upload/v1531984389/lascomidasdelavieja/banoffee.jpg",
                        originalName: "banoffee.jpg"
                    }
                }
            ]
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
     })
    .catch((err) =>{
        console.log(err)
    }) 