import express from 'express'
import eventCtrl from '../controllers/events.controller'
import authCtrl from '../controllers/auth.controller'
import userCtrl from '../controllers/user.controller'

const router = express.Router()

router.route('/api/events')
  .get(authCtrl.requireSignin, eventCtrl.list)
  .post(authCtrl.requireSignin, authCtrl.hasAdminAuthorization, eventCtrl.create)

router.route('/api/events/:eventId')
  .get(authCtrl.requireSignin, authCtrl.hasAdminAuthorization, eventCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAdminAuthorization, eventCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAdminAuthorization, eventCtrl.remove)

router.route('/api/events/rsvp/:eventId').put(authCtrl.requireSignin, eventCtrl.rsvp)
router.route('/api/events/unrsvp/:eventId').put(authCtrl.requireSignin, eventCtrl.unrsvp)

router.param('eventId', eventCtrl.eventByID)

export default router
