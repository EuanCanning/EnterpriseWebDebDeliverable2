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
import {list,listByUserId,userLikes} from './api-comment.js'
import auth from './../auth/auth-helper'
import AddComment from './AddComment.js'
import Edit from '@material-ui/icons/Edit' 
import DeleteComment from './DeleteComment.js'
import UpdateComment from './UpdateComment.js'
import Like from './likes.js'
 
const useStyles = makeStyles(theme => ({
  title: {
    margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
    color: theme.palette.openTitle
  },
  paper:{
    padding: theme.spacing(1),
    margin: theme.spacing(5)
  }
}))

export default function Comments() {
  const classes = useStyles()
  const [comments, setComments] = useState([])
  const [mycomments, setMycomments] = useState([])
  const [mylikes, setMylikes] = useState([])

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

    listByUserId({
      userId: auth.isAuthenticated().user._id 
    },{t: jwt.token}, signal).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        setMycomments(data)
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

    return function cleanup(){
      abortController.abort()
    }
  }, [])


    return (
      <div>
      <Paper elevation={4} className={classes.paper}>
        <Typography variant="h6" className={classes.title}>
          Comments
        </Typography>
        <List>
         {comments.map((item, i) => {
          return <ListItem>
                  <Link to={"/comment/" + item._id} key={i}>
                  <ListItem Button> 
                  <ListItemText primary={item.name} secondary={item.comment}/>
                  </ListItem> 
                  </Link>
                  <ListItemSecondaryAction>
                  {
                      
                        mycomments.map((myitem, i) => {
                          if (myitem._id==item._id){
                            return <div>
                              <UpdateComment commentId={item._id} comment={item.comment}/>
                              <DeleteComment commentId={item._id}/>
                        </div>}
                        }
                      )
                      
                    }
                    {
                      mylikes.map((mylike, i) => {
                        console.log(mylike.commentID)
                        console.log(item._id)
                        if (mylike.commentID==item._id){
                          return <div>
                            <Like like={true} userId={auth.isAuthenticated().user._id} commentId={item._id}/>
                      </div>}
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
      
      <AddComment reply={false} replyTo={null}/>
      </div>
    )
}
