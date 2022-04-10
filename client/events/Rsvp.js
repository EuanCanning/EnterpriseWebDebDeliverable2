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
  
  const classes = useStyles()
  const [values, setValues] = useState({})

  const handleChange = rsvp => event => {
    setValues({ ...values, [rsvp]: event.target.value})
    if (values.rsvp == true){
      values.rsvp = false
    }
    else if (values.rsvp == false){
      values.rsvp = true
    }
  }
  
  
  
  
    return (<div> 
      <ListItemText primary={'RSVP'} className={classes.description}/>
      {props.rsvp &&
        <Checkbox checked={values.rsvp} defaultChecked onChange={handleChange('rsvp')} inputProps={{ 'aria-label': 'controlled'}}/>
      }
    </div>)

}
Rsvp.propTypes = {
  rsvp: PropTypes.bool
}

