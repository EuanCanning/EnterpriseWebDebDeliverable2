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
import {listReplies,repliesByUserId,read,userLikes} from './api-comment.js'
import auth from '../auth/auth-helper'
import AddComment from './AddComment.js'
import Edit from '@material-ui/icons/Edit' 
import DeleteComment from './DeleteComment.js'
import UpdateComment from './UpdateComment.js'
import PropTypes from 'prop-types'
import Like from './likes.js'
 
const useStyles = makeStyles(theme => ({
  root: theme.mixins.gutters({
    padding: theme.spacing(1),
    margin: theme.spacing(5)
  }),
  title: {
    margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
    color: theme.palette.openTitle
  },
  paper:{
    padding: theme.spacing(1),
    margin: theme.spacing(5)
  }
}))

export default function Comments({match},props) {
  const classes = useStyles()
  const [comment, setComment] = useState([])
  const [comments, setComments] = useState([])
  const [mycomments, setMycomments] = useState([])
  const [mylikes, setMylikes] = useState([])
  

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    const jwt = auth.isAuthenticated()

    listReplies({
      commentId: match.params.commentId
    },{t: jwt.token}, signal).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        setComments(data)
      }
    })


    read({
      commentId: match.params.commentId 
    },{t: jwt.token}, signal).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        setComment(data)
      }
    })

    userLikes({
      userId: auth.isAuthenticated().user._id
    },{t: jwt.token}, signal).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        console.log('hi')
        console.log(data)
        setMylikes(data)
      }
    })

    repliesByUserId({
      commentId: match.params.commentId,
      userId: auth.isAuthenticated().user._id 
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
      <Paper className={classes.paper} elevation={4}>
        <Typography variant="h6" className={classes.title}>
          Comment
        </Typography>
        <List>
        <ListItem>
          <ListItem Button> 
          <ListItemText primary={comment.name + '    Likes: ' + item.likes} secondary={comment.comment}/>
          </ListItem> 
          <ListItemSecondaryAction>
          </ListItemSecondaryAction>
        </ListItem>
        </List>
      </Paper>
      <Paper className={classes.root} elevation={4}>
      <Typography variant="h6" className={classes.title}>
          Replies
        </Typography>
        <List>
         {comments.map((item, i) => {
          return <ListItem>
                  <ListItem Button> 
                  <ListItemText primary={item.name + '    Likes: ' + item.likes} secondary={item.comment}/>
                  </ListItem> 
                  <ListItemSecondaryAction>
                  {
                      
                      mycomments.map((myitem, i) => {
                        if (myitem._id==item._id){
                          return <DeleteComment commentId={item._id}/>}
                      }
                      
                    )
                    
                  }

{
                    
                    mycomments.map((myitem, i) => {
                      if (myitem._id==item._id){
                        return <UpdateComment commentId={item._id} comment={item.comment}/>}
                    }
                    
                  )
                  
                }
                {
                      mylikes.map((mylike, i) => {
                        console.log(mylike.commentID)
                        console.log(item._id)
                        if (mylike.commentID==item._id){
                          return <Like like={true} userId={auth.isAuthenticated().user._id} commentId={item._id}/>
                      }
                      }
                    )
                      
                    
                  }
                  {
                    !mylikes.find((mylike) => {
                      if (mylike.commentID==item._id){
                        return true}
                    }
                  ) && <Like like={false} userId={auth.isAuthenticated().user._id} commentId={item._id}/>
                  }
                  </ListItemSecondaryAction>
                </ListItem>
                    
                 
               })
             }
        </List>
      </Paper>
      
      <AddComment reply={true} replyTo={match.params.commentId}/>
      </div>
    )
}

Comments.propTypes = {
  comment: PropTypes.bool,
  name: PropTypes.string.isRequired
}
