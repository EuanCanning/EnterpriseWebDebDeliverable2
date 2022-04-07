import express from 'express'
import commentCtrl from '../controllers/comments.controller'
import authCtrl from '../controllers/auth.controller'

const router = express.Router()

router.route('/api/comments')
  .get(commentCtrl.list)
  .post(commentCtrl.create)

router.route('/api/comments/:userId/:commentId')
  .get(authCtrl.requireSignin, authCtrl.hasAuthorization, commentCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, commentCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, commentCtrl.remove)

router.param('/comments/:userId', commentCtrl.commentsByID )



export default router
