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
import {update} from './api-comment.js'
import {Redirect} from 'react-router-dom'
import TextArea from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

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

export default function UpdateComment(props) {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [values, setValues] = useState({
    comment: '',
  })

  values.comment= props.comment

  const jwt = auth.isAuthenticated()
  const clickButton = () => {
    setOpen(true)
  }

  const handleChange = comment => event => {
    setValues({ ...values, [comment]: event.target.value})
  }

  const updateComment = () => { 
    const comment = {
      comment: values.comment || undefined
    }
    update({
      commentId: props.commentId
    }, {t: jwt.token}, comment).then((data) => {
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
        <DialogTitle>{"Edit Account"}</DialogTitle>
        <DialogContent>
          <TextArea id="comment" label="Edit Comment" className={classes.textArea} value={values.comment} onChange={handleChange('comment')} margin="normal"/>
            {
              values.error && (<Typography component="p" color="error">
                <Icon color="error" className={classes.error}>error</Icon>
                {values.error}</Typography>)
            }
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
UpdateComment.propTypes = {
  commentId: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired
}

