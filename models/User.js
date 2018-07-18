const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const pictureSchema = new Schema({
  path: String,
  originalName: String
})
const userSchema = new Schema({
  username: {type:String,unique:true},
  password: String,
  email:  {type:String,unique:true},
  active: Boolean,
  favoriteRecipes: [{type: Schema.Types.ObjectId, ref: 'Recipe'}],
  profilePic: pictureSchema
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
