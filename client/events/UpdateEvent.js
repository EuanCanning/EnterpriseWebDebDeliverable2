import React, {useState} from 'react'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import EditIcon from '@material-ui/icons/Edit' 
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import auth from '../auth/auth-helper'
import {update} from './api-event.js'
import {Redirect} from 'react-router-dom'
import TextArea from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import TextField from '@mui/material/TextField'

const useStyles = makeStyles(theme => ({
  root: theme.mixins.gutters({
    padding: theme.spacing(1),
    margin: theme.spacing(5)
  }),
  title: {
    margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
    color: theme.palette.openTitle
  },
  textArea: {
    margin: 'auto',
    height: 100,
    width: 500
  },
  submit: {
    margin: 'auto'
  },
  textField: {
    margin: 'auto',
    height: 100,
    width: 500,
    fontSize:12,
    padding: 10,
  }
}))

export default function UpdateEvent(props) {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [values, setValues] = useState({
    eventName: props.eventName,
    description: props.description,
    eventStartTime: props.eventStartTime,
    eventEndTime: props.eventEndTime
  })


  const jwt = auth.isAuthenticated()
  const clickButton = () => {
    setOpen(true)
  }

  const handleChange = eventparameter => event => {
    setValues({ ...values, [eventparameter]: event.target.value})
  }

  const updateComment = () => { 
    const event = {
      eventName: values.eventName|| undefined,
      description: values.description|| undefined,
      eventStartTime: values.eventStartTime|| undefined,
      eventEndTime: values.eventEndTime|| undefined
    }
    update({
      userId: auth.isAuthenticated().user._id,
      eventId: props.eventId
    }, {t: jwt.token}, event).then((data) => {
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
      <IconButton aria-label="Edit" onClick={clickButton} >
        <EditIcon/>
      </IconButton>

      <Dialog open={open} onClose={handleRequestClose}>
        <DialogTitle>{"Edit Event"}</DialogTitle>
        <DialogContent>
        <List>
          <ListItem>
            <TextArea id="eventName" label="Event Name" className={classes.textArea} value={values.eventName} onChange={handleChange('eventName')} margin="normal"/>
          </ListItem>
          <ListItem>
            <TextArea id="description" label="Description" className={classes.textArea} value={values.description} onChange={handleChange('description')} margin="normal"/>
          </ListItem>
          <ListItem>
            <LocalizationProvider dateAdapter={AdapterDateFns} className={classes.textField}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props}  className={classes.textField}/>}
                label="StartTime"
                value={values.eventStartTime}
                onChange={(newValue => {
                  setValues({ ...values, eventStartTime: newValue})
                })}
                className={classes.textField}
              />
            </LocalizationProvider>
            
          </ListItem>
          <ListItem>
          <LocalizationProvider dateAdapter={AdapterDateFns} className={classes.textField}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props}  className={classes.textField}/>}
                label="EndTime"
                value={values.eventEndTime}
                onChange={(newValue => {
                  setValues({ ...values, eventEndTime: newValue})
                })}
                className={classes.textField}
              />
            </LocalizationProvider>
            </ListItem>
          <ListItem>
            {
              values.error && (<Typography component="p" color="error">
                <Icon color="error" className={classes.error}>error</Icon>
                {values.error}</Typography>)
            } 
          </ListItem>
        </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRequestClose} color="primary">
            Cancel
          </Button>
          <Button onClick={updateComment} color="secondary" autoFocus="autoFocus">
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </span>)

}
UpdateEvent.propTypes = {
  eventId: PropTypes.string.isRequired,
  eventName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  eventStartTime: PropTypes.string.isRequired,
  eventEndTime: PropTypes.string.isRequired
}

