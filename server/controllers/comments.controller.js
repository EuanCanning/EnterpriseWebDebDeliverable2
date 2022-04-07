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


const commentsByID = async (req, res, next, id) => {
  try {
    let comments = await Comment.find({userId : id}).select('_id userId comment likes created')
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
    return res.json(req)
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
    let deletedComment = await deletedComment.remove()
    res.json(deletedComment)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}


export default {
  create,
  commentsByID,
  list,
  remove,
  update
}
