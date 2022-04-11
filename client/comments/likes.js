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
import {userlike, userunlike} from './api-comment.js'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import Favorite from '@mui/icons-material/Favorite'


const useStyles = makeStyles(theme => ({
  root: theme.mixins.gutters({
    padding: theme.spacing(1),
    margin: theme.spacing(3)
  }),
  description: {
    fontSize:13,
  }
}))

export default function likes(props) {
  console.log(1)
  console.log(props.userId)
  console.log(props.commentId)
  console.log(props.like)
  const classes = useStyles()
  const [values, setValues] = useState({
    like : props.like,
  })
  const [passthrough, setPassthrough] = useState({
    userId : props.userId,
    commentId : props.commentId,
  })
  const jwt = auth.isAuthenticated()

  const handleChange = like => event => {
    setValues({ ...values, [like]: event.target.checked})
    console.log(values.like)
    console.log(2)
    console.log(passthrough.userId)
    console.log(passthrough.commentId)
    if (values.like==true){
      console.log(jwt.token)
      userunlike({
        userId: passthrough.userId,
        commentId: passthrough.commentId
      }, {t: jwt.token}).then((data) => {
        if (data && data.error) {
          console.log(data.error)
        } else {
        }
      })
    }
    else if (values.like==false){
      console.log(jwt.token)
      userlike({
        userId: passthrough.userId,
        commentId: passthrough.commentId
      }, {t: jwt.token}).then((data) => {
        if (data && data.error) {
          console.log(data.error)
        } else {
        }
      })
    }
  }
  
  
  
  
    return (<Checkbox checked={values.like} onChange={handleChange('like')} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
    
    )

}
likes.propTypes = {
  like: PropTypes.bool,
  userId: PropTypes.string.isRequired,
  commentId: PropTypes.string.isRequired
}

