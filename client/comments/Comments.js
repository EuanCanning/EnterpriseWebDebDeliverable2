import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import Typography from '@material-ui/core/Typography'
import ArrowForward from '@material-ui/icons/ArrowForward'
import Person from '@material-ui/icons/Person'
import {Link} from 'react-router-dom'
import {list} from './api-comment.js'
import auth from './../auth/auth-helper'
import AddComment from './AddComment.js'
import e from 'express'
import Edit from '@material-ui/icons/Edit'

const useStyles = makeStyles(theme => ({
  root: theme.mixins.gutters({
    padding: theme.spacing(1),
    margin: theme.spacing(5)
  }),
  title: {
    margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
    color: theme.palette.openTitle
  }
}))

export default function Comments() {
  const classes = useStyles()
  const [comments, setComments] = useState([])
  const [mycomments, setMycomments] = useState([])

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    const jwt = auth.isAuthenticated()

    list({t: jwt.token}, signal).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        setComments(data)
      }
    })

    const abortController = new AbortController()
    const signal = abortController.signal
    const jwt = auth.isAuthenticated()

    listByUserId({
      userId: match.params.userId
    },{t: jwt.token}, signal).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        setMycomments(data)
      }
    })

    return function cleanup(){
      abortController.abort()
    }
  }, [])


    return (
      <div>
      <Paper className={classes.root} elevation={4}>
        <Typography variant="h6" className={classes.title}>
          Comments
        </Typography>
        <List>
         {comments.map((item, i) => {
          return <Link to={"/comments/" + item._id} key={i}>
                    <ListItem button>
                      <ListItemText primary={item.name} secondary={item.comment}/>
                      
                    </ListItem>
                    <ListItemSecondaryAction>
                    {
                        mycomments.find(function (mycomment){
                          if (item._id==mycomment._id){
                            return <div>
                              <IconButton aria-label="Edit" color="primary">
                                <Edit/>
                              </IconButton>
                              <IconButton aria-label="Delete" color="secondary">
                                <DeleteIcon/>
                              </IconButton>
                          </div>
                          }
                        })
                        
                      }
                    </ListItemSecondaryAction>
                 </Link>
               })
             }
        </List>
      </Paper>
      
      <AddComment/>
      </div>
    )
}
