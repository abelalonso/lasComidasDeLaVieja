const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const commentSchema = new Schema({
  content: String,
  authorId: {type: Schema.Types.ObjectId, ref: 'User'},
  recipeId: {type: Schema.Types.ObjectId, ref: 'Recipe'},
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;