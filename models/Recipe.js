const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  name: String,
  authorId: {type: Schema.Types.ObjectId, ref: 'User'},
  ingredients: [String],
  steps: [String],
  elaborationTime: String,
  category: {type: String, enum:["Entrante", "Principal", "Primero", "Postre", "Bebida"]},
  keywords: [String],
  recipeBeers: [],
  recipePic: {
    path: {type: String, default: "https://res.cloudinary.com/du4kngmkp/image/upload/v1531987691/lascomidasdelavieja/no-foto.png"},
    originalName: {type: String, default: "Sin Foto"}
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;
