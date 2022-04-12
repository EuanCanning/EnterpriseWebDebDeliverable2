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
import {list,userRsvps,isAdmin} from './api-event.js'
import auth from '../auth/auth-helper'
//import AddComment from './AddComment.js'
import Edit from '@material-ui/icons/Edit' 
//import DeleteComment from './DeleteComment.js'
//import UpdateComment from './UpdateComment.js'
import myImg from './../assets/images/myimage.png'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import Rsvp from './Rsvp.js'
import DeleteEvent from './DeleteEvent.js'
import UpdateEvent from './UpdateEvent.js'
import AddEvent from './AddEvent.js'

 
const useStyles = makeStyles(theme => ({
  normal:{
    padding: theme.spacing(1),
    margin: theme.spacing(3)
  },
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
    maxWidth: 300,
    minWidth: 300,
    margin: 'auto',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5)
  },
  media: {
    minHeight: 200
  }
}))

export default function Events({ match }) {
  const classes = useStyles()
  const [events, setEvents] = useState([])
  const [myrsvps, setMyrsvps] = useState([])
  const [userisadmin, setUserisadmin] = useState([])
  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    const jwt = auth.isAuthenticated()
    setUserisadmin(false)

    list({
      userId: match.params.userId
    },{t: jwt.token}, signal).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        setEvents(data)
      }
    })

    isAdmin({
      userId: match.params.userId
    },{t: jwt.token}, signal).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        
        setUserisadmin(true)
        console.log('is admin = ' + userisadmin)
      }
    })

    userRsvps({
      userId: match.params.userId
    },{t: jwt.token}, signal).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        console.log('hi')
        console.log(data)
        setMyrsvps(data)
      }
    })

    

    

    return function cleanup(){
      abortController.abort()
    }
  }, [])


    return (
      <div>
      <Paper className={classes.normal} elevation={4}>
        <Typography variant="h6" className={classes.title}>
          Events
        </Typography>
        
      
      </Paper>
        
         {events.map((item, i) => {
           let st = new Date(item.eventStartTime)
           let et = new Date(item.eventEndTime)
           let stminutes = 0
           let etminutes = 0
           if(st.getMinutes()<10){
              stminutes = '0' + st.getMinutes().toString()
           }else{
              stminutes = st.getMinutes().toString()
           }
           if(et.getMinutes()<10){
              etminutes = '0' + et.getMinutes().toString()
           }else{
              etminutes = et.getMinutes().toString()
           }
          return <Paper className={classes.normal} elevation={4}>
            <List>
              <ListItem>
                <ListItem Button> 
                <ListItemText primary={item.eventName} className={classes.title2}/>
                {userisadmin && <ListItemText primary={'Rsvps: ' + item.Rsvps} className={classes.title2}/> }
                </ListItem> 
              </ListItem> 
              <ListItem>
                <ListItem Button> 
                <ListItemText primary={item.description} className={classes.description}/>
                </ListItem> 
                <ListItemSecondaryAction> 
                <ListItemText primary={'Rsvp:'} className={classes.title2}/>
                  {
                      myrsvps.map((myrsvp, i) => {
                        console.log(myrsvp.eventID)
                        console.log(item._id)
                        if (myrsvp.eventID==item._id){
                          return <Rsvp rsvp={true} userId={match.params.userId} eventId={item._id}/>}
                      }
                    )
                      
                    
                  }
                  {
                    !myrsvps.find((myrsvp) => {
                      if (myrsvp.eventID==item._id){
                        return true}
                    }
                  ) && <Rsvp rsvp={false} userId={match.params.userId} eventId={item._id}/>
                  }
                  {
                    userisadmin && <DeleteEvent eventId={item._id} userId={match.params.userId}/>
                  }
                  {
                    userisadmin && <UpdateEvent eventId={item._id} eventName={item.eventName} description={item.description} eventStartTime={item.eventStartTime} eventEndTime={item.eventEndTime}/>
                  }
                
                </ListItemSecondaryAction>
              </ListItem>   
                <ListItem>
                  <ListItem Button> 
                  <ListItemText primary={'Date: ' + st.getDate() +'/' + st.getMonth() +'/' + st.getFullYear() 
                  + '   Start Time: ' + st.getHours() + ':' + stminutes
                  + '   End Time: ' + et.getHours() + ':' + etminutes} className={classes.description}/>
                </ListItem> 
                <ListItemSecondaryAction>
                
                </ListItemSecondaryAction>
              </ListItem> 
              
            </List> 
          </Paper>
               })
             }
      
      {userisadmin && <AddEvent/> }
      </div>
    )
}
