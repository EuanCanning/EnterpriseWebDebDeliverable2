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
import {Redirect} from 'react-router-dom'
import Checkbox from '@mui/material/Checkbox'
import { makeStyles } from '@material-ui/core/styles'
import ListItemText from '@material-ui/core/ListItemText'
import {userrsvp, userunrsvp} from './api-event.js'


const useStyles = makeStyles(theme => ({
  root: theme.mixins.gutters({
    padding: theme.spacing(1),
    margin: theme.spacing(3)
  }),
  description: {
    fontSize:13,
  }
}))

export default function Rsvp(props) {
  console.log(1)
  console.log(props.userId)
  console.log(props.eventId)
  console.log(props.rsvp)
  const classes = useStyles()
  const [values, setValues] = useState({
    rsvp : props.rsvp,
  })
  const [passthrough, setPassthrough] = useState({
    userId : props.userId,
    eventId : props.eventId,
  })
  const jwt = auth.isAuthenticated()

  const handleChange = rsvp => event => {
    setValues({ ...values, [rsvp]: event.target.checked})
    console.log(values.rsvp)
    console.log(2)
    console.log(passthrough.userId)
    console.log(passthrough.eventId)
    if (values.rsvp==true){
      userrsvp({
        userId: passthrough.userId,
        eventId: passthrough.eventId
      }, {t: jwt.token}).then((data) => {
        if (data && data.error) {
          console.log(data.error)
        } else {
        }
      })
    }
    else if (values.rsvp==false){
      userunrsvp({
        userId: passthrough.userId,
        eventId: passthrough.eventId
      }, {t: jwt.token}).then((data) => {
        if (data && data.error) {
          console.log(data.error)
        } else {
        }
      })
    }
  }
  
  
  
  
    return (<Checkbox checked={values.rsvp} onChange={handleChange('rsvp')} inputProps={{ 'aria-label': 'controlled'}}/>
    
    )

}
Rsvp.propTypes = {
  rsvp: PropTypes.bool,
  userId: PropTypes.string.isRequired,
  eventId: PropTypes.string.isRequired
}

