import React, {useState} from 'react'
import * as React from 'react'
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
  const [open, setOpen] = useState(false)
  const [values, setValues] = useState({
    rsvp: props.rsvp || false,
  })

  const handleChange = checked => event => {
    setValues({ ...values, [checked]: event.target.value})
  }
  
  

  
    return (<div>
      <ListItemText primary={'RSVP'} className={classes.description}/>
      {props.rsvp &&
        <Checkbox checked={values.checked} onClick={handleChange} inputProps={{ 'aria-label': 'controlled'}}/>
      }
      {!props.rsvp &&
        <Checkbox checked={values.checked} onClick={handleChange} inputProps={{ 'aria-label': 'controlled'}}/>
      }
    </div>)

}
Rsvp.propTypes = {
  rsvp: PropTypes.bool
}

