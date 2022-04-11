import React, {useState} from 'react'
import Button from '@material-ui/core/Button'
import TextArea from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/core/styles'
import {create} from './api-event.js'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import {Link} from 'react-router-dom'
import auth from '../auth/auth-helper'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import {Redirect} from 'react-router-dom'

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
  }
}))



export default function AddEvent() {
  const classes = useStyles()
  const [values, setValues] = useState({
    eventName: '',
    description: '',
    eventStartTime: '',
    eventEndTime: '',
    error: ''
  })

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value})
  }

  const clickSubmit = () => {
    const event = {
      eventName: values.eventName || undefined,
      description: values.description || undefined,
      eventStartTime: values.eventStartTime || undefined,
      eventEndTime: values.eventEndTime || undefined
    }
    const jwt = auth.isAuthenticated()
    create({t: jwt.token},event).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error})
      } else {
        setValues({ ...values, error: ''})
        location.reload()
      }
    })
  }

  
  
    return (<div>
      <Paper className={classes.root} elevation={4}>
        <List>
          <ListItem>
            <TextArea id="eventName" label="Event Name" className={classes.textArea} value={values.eventName} onChange={handleChange('eventName')} margin="normal"/>
            <TextArea id="description" label="Description" className={classes.textArea} value={values.description} onChange={handleChange('description')} margin="normal"/>
            <TextArea id="eventStartTime" label="Start Time" className={classes.textArea} value={values.eventStartTime} onChange={handleChange('eventStartTime')} margin="normal"/>
            <TextArea id="eventEndTime" label="End Time" className={classes.textArea} value={values.eventEndTime} onChange={handleChange('eventEndTime')} margin="normal"/>
            {
              values.error && (<Typography component="p" color="error">
                <Icon color="error" className={classes.error}>error</Icon>
                {values.error}</Typography>)
            }
          </ListItem>
          <ListItem>
            <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>Submit</Button>
            </ListItem>
       </List> 
      </Paper>
      
      
    </div>
    )
}