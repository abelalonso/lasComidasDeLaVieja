const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: {type:String,unique:true},
  password: String,
  email:  {type:String,unique:true},
  active: Boolean,
  favoriteRecipes: [{type: Schema.Types.ObjectId, ref: 'Recipe'}],
  profilePic: {
    path: {type: String, default: "https://res.cloudinary.com/du4kngmkp/image/upload/v1531986939/lascomidasdelavieja/anonimo.jpg"},
    originalName: {type: String, default: "Anónimo"}
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
