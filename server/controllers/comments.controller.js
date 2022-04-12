import Comment from '../models/comments.model'
import extend from 'lodash/extend'
import errorHandler from './../helpers/dbErrorHandler'
import Like from '../models/likes.model'

const create = async (req, res) => {
  const comment = new Comment(req.body)
  try {
    await comment.save()
    return res.status(200).json({
      message: "Successfully added comment!"
    })
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const list = async (req, res) => {
  try {
    let comments = await Comment.find({reply : false}).select('_id userId name comment likes created').sort({ created: -1 })
    res.json(comments)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const listReplies = async (req, res) => {
  try {
    let comments = await Comment.find({reply : true, replyTo : req.comment._id}).select('_id userId name comment likes created').sort({ created: -1 })
    res.json(comments)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}


const commentsByUserID = async (req, res) => {
  try {
    let user = req.profile
    
    let comments = await Comment.find({reply : false, userId : user._id}).select('_id')
    console.log(comments)
    if (!comments)
      return res.status('400').json({
        error: "User not found"
      })
    res.json(comments)
  }catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
  }

  const repliesByUserID = async (req, res) => {
    try {
      let user = req.profile
      
      let comments = await Comment.find({reply : true, replyTo : req.comment._id, userId : user._id}).select('_id')
      console.log(comments)
      if (!comments)
        return res.status('400').json({
          error: "User or comment not found"
        })
      res.json(comments)
    }catch (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
    }

  const read = (req, res) => {
    return res.json(req.comment)
  }

  const commentByID = async (req, res, next, id) => {
    try {
      let comment = await Comment.findById(id)
      if (!comment)
        return res.status('400').json({
          error: "Comment not found"
        })
      req.comment = comment
      next()
    } catch (err) {
      return res.status('400').json({
        error: "Could not retrieve comment"
      })
    }
  }

const update = async (req, res) => {
  try {
    let comment = req.comment
    comment = extend(comment, req.body)
    await comment.save()
    res.json(comment)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}


const remove = async (req, res) => {
  try {
    let comment = req.comment
    await Like.deleteMany({commentID : req.comment._id})
    let deletedComment = await comment.remove()
    res.json(deletedComment)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const like = async (req, res) => {
  try{
    let comment = req.comment
    console.log(comment)
    comment.likes = comment.likes + 1
    console.log(comment.likes)
    console.log(comment)
    await comment.save()
  res.json(comment)
  } catch (err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const unlike = async (req, res) => {
  try{
    let comment = req.comment
    comment.likes = comment.likes - 1
    await comment.save()
  res.json(comment)
  } catch (err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const likeUser = async (req,res,next) => {
  try{
    let userId = req.profile._id
    console.log(userId)
    let commentId = req.comment._id
    console.log(commentId)
    let likes = await Like.find({userID : userId, commentID : commentId}).select('userID commentID')
    console.log(likes)
    if (likes.length != 0) {
      return res.status('400').json({
        error: "like has already been confirmed"
      })
    
    }
    const like = new Like();
    like.userID = req.profile._id;
    like.commentID = req.comment._id  
    like.save()
    next()
        
  }catch (err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }

}

const unlikeUser = async (req,res,next) => {
  try{
    let userId = req.profile._id
    console.log(userId)
    let commentId = req.comment._id
    console.log(commentId)
    let likes = await Like.find({userID : userId, commentID : commentId}).select('userID commentID')
    console.log(likes)
    if (likes.length == 0) {
      return res.status('400').json({
        error: "like has not been confirmed"
      })
    
    }
    const like = new Like(likes[0])
    await like.remove()
    next()
        
  }catch (err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }

}


const likes = async (req,res) => {
  try{
    let userId = req.profile._id
    console.log(userId)
    let commentIDs = await Like.find({userID : userId}).select('commentID')
    console.log(commentIDs)
    
    
    res.json(commentIDs)   
  }catch (err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }

}


export default {
  create,
  commentsByUserID,
  repliesByUserID,
  commentByID,
  read,
  list,
  listReplies,
  remove,
  update,
  like,
  unlike,
  likeUser,
  unlikeUser,
  likes

}
