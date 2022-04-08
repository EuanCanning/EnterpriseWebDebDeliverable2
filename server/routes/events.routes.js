import express from 'express'
import eventCtrl from '../controllers/events.controller'
import authCtrl from '../controllers/auth.controller'
import userCtrl from '../controllers/user.controller'

const router = express.Router()

router.route('/api/events')
  .get(authCtrl.requireSignin, eventCtrl.list)
  .post(authCtrl.requireSignin, authCtrl.hasAdminEventAuthorization, eventCtrl.create)

router.route('/api/events/:eventId')
  .get(authCtrl.requireSignin, authCtrl.hasAdminEventAuthorization, eventCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAdminEventAuthorization, eventCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAdminEventAuthorization, eventCtrl.remove)

router.route('/api/events/rsvp/:eventId').put(authCtrl.requireSignin, eventCtrl.rsvp)
router.route('/api/events/unrsvp/:eventId').put(authCtrl.requireSignin, eventCtrl.unrsvp)

router.param('eventId', eventCtrl.eventByID)

export default router
