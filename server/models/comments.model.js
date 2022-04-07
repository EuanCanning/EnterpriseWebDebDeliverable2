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
    trim: true
  },
  comment: {
    type: String,
    trim: true
  }
})



const commentModel = mongoose.model('Comment', CommentSchema);
commentModel.createIndexes();
export default commentModel
