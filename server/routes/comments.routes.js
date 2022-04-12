import express from 'express'
import commentCtrl from '../controllers/comments.controller'
import authCtrl from '../controllers/auth.controller'
import userCtrl from '../controllers/user.controller'

const router = express.Router()

router.route('/api/comments')
  .get(authCtrl.requireSignin, commentCtrl.list)
  .post(authCtrl.requireSignin, commentCtrl.create)

router.route('/api/comments/comment/:commentId')
  .get(authCtrl.requireSignin, commentCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasCommentAuthorization, commentCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasCommentAuthorization, commentCtrl.remove)

router.route('/api/comment/replies/:commentId')
  .get(authCtrl.requireSignin,commentCtrl.listReplies)
router.route('/api/comment/replies/:commentId/:userId')
.get(authCtrl.requireSignin, authCtrl.hasAuthorization, commentCtrl.repliesByUserID)

router.route('/api/comments/user/:userId')
  .get(authCtrl.requireSignin, authCtrl.hasAuthorization, commentCtrl.commentsByUserID)

  router.route('/api/like/:userId/:commentId')
  .put(authCtrl.requireSignin,authCtrl.hasAuthorization, commentCtrl.likeUser, commentCtrl.like)
router.route('/api/unlike/:userId/:commentId') 
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, commentCtrl.unlikeUser, commentCtrl.unlike)

router.route('/api/likes/:userId')
  .get(authCtrl.requireSignin,authCtrl.hasAuthorization, commentCtrl.likes)


router.param('commentId', commentCtrl.commentByID)
router.param('userId', userCtrl.userByID)

export default router
