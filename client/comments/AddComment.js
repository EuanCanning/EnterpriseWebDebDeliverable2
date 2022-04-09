import React, {useState} from 'react'
import Button from '@material-ui/core/Button'
import TextArea from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/core/styles'
import {create} from './api-comment.js'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import {Link} from 'react-router-dom'
import auth from './../auth/auth-helper'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'

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



export default function AddComment() {
  const classes = useStyles()
  const [values, setValues] = useState({
    userId: '',
    name: '',
    comment: '',
    open: false,
    error: ''
  })

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  const clickSubmit = () => {
    const comment = {
      userId: auth.isAuthenticated().user._id || undefined,
      name: auth.isAuthenticated().user.name || undefined,
      comment: values.comment || undefined
    }
    const jwt = auth.isAuthenticated()
    create({t: jwt.token},comment).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error})
      } else {
        setValues({ ...values, error: '', open: true})
      }
    })
  }

    return (<div>
      <Paper className={classes.root} elevation={4}>
        <List>
          <List-item>
            <TextArea id="name" label="Name" className={classes.textField} value={values.name} onChange={handleChange('name')} margin="normal"/>
            {
              values.error && (<Typography component="p" color="error">
                <Icon color="error" className={classes.error}>error</Icon>
                {values.error}</Typography>)
            }
          </List-item>
          <List-item>
            <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>Submit</Button>
            </List-item>
       </List> 
      </Paper>
      
      
    </div>
    )
}