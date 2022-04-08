import express from 'express'
import eventCtrl from '../controllers/events.controller'
import authCtrl from '../controllers/auth.controller'
import userCtrl from '../controllers/user.controller'

const router = express.Router()

router.route('/api/events/:userId')
  .get(authCtrl.requireSignin, eventCtrl.list)
  .post(authCtrl.requireSignin, authCtrl.hasAuthorization, eventCtrl.create)

router.route('/api/events/:userId/:eventId')
  .get(authCtrl.requireSignin, authCtrl.hasAdminAuthorization, eventCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAdminAuthorization, eventCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAdminAuthorization, eventCtrl.remove)

router.route('/api/events/rsvp/:userId/:eventId')
  .put(authCtrl.requireSignin,authCtrl.hasAuthorization, eventCtrl.rsvpUser, eventCtrl.rsvp)
router.route('/api/events/unrsvp/:userId/:eventId')
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, eventCtrl.unrsvpUser, eventCtrl.unrsvp)

router.param('eventId', eventCtrl.eventByID)
router.param('userId', userCtrl.userByID)

export default router
