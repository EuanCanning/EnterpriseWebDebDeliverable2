import express from 'express'
import commentCtrl from '../controllers/comments.controller'
import authCtrl from '../controllers/auth.controller'

const router = express.Router()

router.route('/api/comments')
  .get(authCtrl.requireSignin, commentCtrl.list)
  .post(authCtrl.requireSignin, commentCtrl.create)

router.route('/api/comments/:commentId')
  .get(authCtrl.requireSignin, commentCtrl.read)

  router.param('commentId', commentCtrl.commentByID)

export default router
