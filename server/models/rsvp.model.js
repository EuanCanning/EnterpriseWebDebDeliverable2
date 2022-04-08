import mongoose from 'mongoose'
import crypto from 'crypto'

const RsvpSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: 'User ID is required'
  },
  eventID: {
    type: String,
    required: 'Event ID is required'
  }
})



const rsvpModel = mongoose.model('Rsvp', RsvpSchema);
rsvpModel.createIndexes();
export default rsvpModel
