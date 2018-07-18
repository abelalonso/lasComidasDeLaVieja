const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pictureSchema = new Schema({
  path: String,
  originalName: String
});


const recipeSchema = new Schema({
  name: String,
  authorId: {type: Schema.Types.ObjectId, ref: 'User'},
  ingredients: [String],
  steps: [String],
  elaborationTime: String,
  category: {type: String, enum:["Entrante", "Principal", "Primero", "Postre", "Bebida"]},
  keywords: [String],
  recipeBeers: [],
  recipePic: pictureSchema
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;
