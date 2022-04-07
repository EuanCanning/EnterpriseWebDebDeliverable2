import express from 'express'
import commentCtrl from '../controllers/comments.controller'
import authCtrl from '../controllers/auth.controller'
import userCtrl from '../controllers/user.controller'

const router = express.Router()

router.route('/api/comments')
  .get(authCtrl.requireSignin, commentCtrl.list)
  .post(authCtrl.requireSignin, commentCtrl.create)

router.route('/api/comments/:commentId')
  .get(authCtrl.requireSignin, commentCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasCommentAuthorization, commentCtrl.update)

router.route('/api/comments/user/:userId')
  .get(authCtrl.requireSignin, commentCtrl.commentsByUserID)


router.param('userId', userCtrl.userByID)
router.param('commentId', commentCtrl.commentByID)

export default router
