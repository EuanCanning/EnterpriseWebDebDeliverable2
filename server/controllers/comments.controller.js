import Comment from '../models/comments.model'
import extend from 'lodash/extend'
import errorHandler from './../helpers/dbErrorHandler'

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
    let comments = await Comment.find().select('_id userId comment likes created')
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
    
    let comments = await Comment.find({userId : user._id}).select('_id userId comment likes created')
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

  const read = (req, res) => {
    return res.json(req.profile)
  }

  const commentByID = async (req, res, next, id) => {
    try {
      let comment = await Comment.findById(id)
      if (!comment)
        return res.status('400').json({
          error: "Comment not found"
        })
      req.profile = comment
      next()
    } catch (err) {
      return res.status('400').json({
        error: "Could not retrieve comment"
      })
    }
  }

const update = async (req, res) => {
  try {
    let comment = req.profile
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
    let comment = req.profile
    let deletedComment = await comment.remove()
    res.json(deletedComment)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}


export default {
  create,
  commentsByUserID,
  commentByID,
  read,
  list,
  remove,
  update
}
