import mongoose from 'mongoose'
import crypto from 'crypto'

const EventsSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: 'Name is required'
  },
  description: {
    type: String,
    required: 'Description is required'
  },
  eventStartTime: {
    type: Date,
    min: Date.now,
    required: 'Start Time is required'
  },
  eventEndTime: {
    type: Date,
    min: Date.now,
    required: 'End Time is required'
  },
  Rsvps: {
    type: Number,
    min: 0,
    default: 0
  },
  created: {
    type: Date,
    default: Date.now
  }
})



const eventModel = mongoose.model('Event', EventsSchema);
eventModel.createIndexes();
export default eventModel
