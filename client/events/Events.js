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
import {list,userRsvps} from './api-event.js'
import auth from '../auth/auth-helper'
//import AddComment from './AddComment.js'
import Edit from '@material-ui/icons/Edit' 
//import DeleteComment from './DeleteComment.js'
//import UpdateComment from './UpdateComment.js'
import myImg from './../assets/images/myimage.png'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'

 
const useStyles = makeStyles(theme => ({
  root: theme.mixins.gutters({
    padding: theme.spacing(1),
    margin: theme.spacing(3)
  }),
  title: {
    margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
  },
  title2: {
    fontSize:16,
  },
  description: {
    fontSize:13,
  },
  card: {
    maxWidth: 128,
    minWidth: 128,
    margin: 'auto',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5)
  },
  media: {
    minHeight: 80
  }
}))

export default function Events({ match }) {
  const classes = useStyles()
  const [events, setEvents] = useState([])
  const [myrsvps, setMyrsvps] = useState([])

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    const jwt = auth.isAuthenticated()

    list({
      userId: match.params.userId
    },{t: jwt.token}, signal).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        setEvents(data)
      }
    })

    userRsvps({
      userId: match.params.userId 
    },{t: jwt.token}, signal).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        setMyrsvps(data)
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
          Events
        </Typography>
        
      
      </Paper>
        
         {events.map((item, i) => {
          return <Paper className={classes.root} elevation={4}>
            <List>
              <ListItem>
                <ListItem Button> 
                <ListItemText primary={item.eventName} className={classes.title2}/>
                </ListItem> 
                <ListItemSecondaryAction>
                
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItem Button> 
                <ListItemText primary={item.description} className={classes.description}/>
                </ListItem> 
                <ListItemSecondaryAction>
                <Card className={classes.card}>
                <CardMedia className={classes.media} image={myImg} title="My Image"/>
              </Card>
                {/*
                    
                      mycomments.map((myitem, i) => {
                        if (myitem._id==item._id){
                          return <div>
                            <UpdateComment commentId={item._id} comment={item.comment}/>
                            <DeleteComment commentId={item._id}/>
                      </div>}
                      }
                    )
                    
                    */}
                </ListItemSecondaryAction>
              </ListItem>    
              
            </List> 
          </Paper>
               })
             }
      
      {/* <AddComment/> ╌> */}
      </div>
    )
}