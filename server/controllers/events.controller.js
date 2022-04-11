import Event from '../models/events.model'
import Rsvp from '../models/rsvp.model'
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
    let events
    if(req.auth.admin){
      events = await Event.find().select('_id eventName description eventStartTime eventEndTime Rsvps')}
    if(!req.auth.admin){
      events = await Event.find().select('_id eventName description eventStartTime eventEndTime')}
    res.json(events)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}


  const read = (req, res) => {
    return res.json(req.event)
  }

  const eventByID = async (req, res, next, id) => {
    try {
      let event = await Event.findById(id)
      if (!event)
        return res.status('400').json({
          error: "Event not found"
        })
      req.event = event
      next()
    } catch (err) {
      return res.status('400').json({
        error: "Could not retrieve Event"
      })
    }
  }

const update = async (req, res) => {
  try {
    let event = req.event
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
    let event = req.event
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
    let event = req.event
    console.log(event)
    event.Rsvps = event.Rsvps + 1
    console.log(event.Rsvps)
    console.log(event)
    await event.save()
  res.json(event)
  } catch (err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const unrsvp = async (req, res) => {
  try{
    let event = req.event
    event.Rsvps = event.Rsvps - 1
    await event.save()
    res.json(event)
  } catch (err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const rsvpUser = async (req,res,next) => {
  try{
    let userId = req.profile._id
    console.log(userId)
    let eventId = req.event._id
    console.log(eventId)
    let rsvps = await Rsvp.find({userID : userId, eventID : eventId}).select('userID eventID')
    console.log(rsvps)
    if (rsvps.length != 0) {
      return res.status('400').json({
        error: "Rsvp has already been confirmed"
      })
    
    }
    const rsvp = new Rsvp();
    rsvp.userID = req.profile._id;
    rsvp.eventID = req.event._id  
    rsvp.save()
    next()
        
  }catch (err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }

}

const unrsvpUser = async (req,res,next) => {
  try{
    let userId = req.profile._id
    console.log(userId)
    let eventId = req.event._id
    console.log(eventId)
    let rsvps = await Rsvp.find({userID : userId, eventID : eventId}).select('_id userID eventID')
    console.log(rsvps)
    if (rsvps.length == 0) {
      return res.status('400').json({
        error: "Rsvp does not exist"
      })
    
    }
    const rsvp = new Rsvp(rsvps[0])
    await rsvp.remove()
    next()
        
  }catch (err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }

}

const rsvps = async (req,res) => {
  try{
    let userId = req.profile._id
    console.log(userId)
    let rsvpIDs = await Rsvp.find({userID : userId}).select('eventID')
    console.log(rsvpIDs)
    if (rsvpIDs.length == 0) {
      return res.status('400').json({
        error: "Rsvps do not exist"
      })
    
    }
    
    res.json(rsvpIDs)   
  }catch (err){
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
  unrsvp,
  rsvpUser,
  unrsvpUser,
  rsvps
}
