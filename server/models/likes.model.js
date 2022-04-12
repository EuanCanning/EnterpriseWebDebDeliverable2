import mongoose from 'mongoose'
import crypto from 'crypto'

const LikesSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: 'User ID is required'
  },
  commentID: {
    type: String,
    required: 'Comment ID is required'
  }
})



const likesModel = mongoose.model('Likes', LikesSchema);
likesModel.createIndexes();
export default likesModel
