import mongoose from 'mongoose'
import crypto from 'crypto'

const CommentSchema = new mongoose.Schema({
  userId: {
    type: String,
    trim: true,
    required: 'UserID is required'
  },
  name: {
    type: String,
    trim: true,
    required: 'Name is required'
  },
  comment: {
    type: String,
    trim: true,
    required: 'Comment is required'
  },
  likes: {
    type: Number,
    default: 0,
    min: 0
  },
  created: {
    type: Date,
    default: Date.now
  }
})



const commentModel = mongoose.model('Comment', CommentSchema);
commentModel.createIndexes();
export default commentModel
