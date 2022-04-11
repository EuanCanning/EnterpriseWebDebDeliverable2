import React, {useState} from 'react'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import auth from '../auth/auth-helper'
import {remove} from './api-event.js'
import {Redirect} from 'react-router-dom'

export default function DeleteEvent(props) {
  const [open, setOpen] = useState(false)
  console.log('this is loading')
  const jwt = auth.isAuthenticated()
  const clickButton = () => {
    setOpen(true)
  }
  const deleteEvent = () => { 
    remove({
      userId: props.userId,
      eventId: props.eventId
    }, {t: jwt.token}).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        location.reload()
      }
    })
  }
  const handleRequestClose = () => {
    setOpen(false)
  }

  
    return (<span>
      <IconButton aria-label="Delete" onClick={clickButton} color="secondary">
        <DeleteIcon/>
      </IconButton>

      <Dialog open={open} onClose={handleRequestClose}>
        <DialogTitle>{"Delete Event"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Confirm to delete the event.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRequestClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteEvent} color="secondary" autoFocus="autoFocus">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </span>)

}
DeleteEvent.propTypes = {
  eventId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired
}

