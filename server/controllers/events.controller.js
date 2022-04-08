import Event from '../models/events.model'
import extend from 'lodash/extend'
import errorHandler from '../helpers/dbErrorHandler'

const create = async (req, res) => {
  const event = new Event(req.body)
  try {
    await event.save()
    return res.status(200).json({
      message: "Successfully added event!"
    })
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
} 

const list = async (req, res) => {
  try {
    let events = await Event.find().select('_id eventName description eventStartTime eventEndTime')
    res.json(events)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}


  const read = (req, res) => {
    return res.json(req.profile)
  }

  const eventByID = async (req, res, next, id) => {
    try {
      let event = await Event.findById(id)
      if (!event)
        return res.status('400').json({
          error: "Event not found"
        })
      req.profile = event
      next()
    } catch (err) {
      return res.status('400').json({
        error: "Could not retrieve Event"
      })
    }
  }

const update = async (req, res) => {
  try {
    let event = req.profile
    event = extend(event, req.body)
    await event.save()
    res.json(event)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}


const remove = async (req, res) => {
  try {
    let event = req.profile
    let deletedEvent = await event.remove()
    res.json(deletedEvent)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const rsvp = async (req, res) => {
  try{
    let event = req.profile
    event.Rsvps = event.Rsvps + 1
    await event.save()
  res.join(event)
  } catch (err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const unrsvp = async (req, res) => {
  try{
    let event = req.profile
    event.Rsvps = event.Rsvps - 1
    await event.save()
  res.join(event)
  } catch (err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}



export default {
  create,
  eventByID,
  read,
  list,
  remove,
  update,
  rsvp,
  unrsvp
}
