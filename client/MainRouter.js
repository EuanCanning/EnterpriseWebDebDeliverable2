import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './core/Home'
import Menu from './core/Menu'
import Users from './user/Users'
import Signup from './user/Signup'
import Signin from './auth/Signin'
import PrivateRoute from './auth/PrivateRoute'
import Profile from './user/Profile'
import EditProfile from './user/EditProfile'
import UserAdmin from './user/UsersAdmin'
import Comments from './comments/Comments'
import Events from './events/Events'
import Comment from './comments/Comment'

const MainRouter = () => {
    return (<div>
      <Menu/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/users" component={Users}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/signin" component={Signin}/>
        <PrivateRoute path="/user/edit/:userId" component={EditProfile}/>
        <Route path="/user/:userId" component={Profile}/>
        <Route path="/useradmin/:userId" component={UserAdmin}/>
        <Route path="/comments" component ={Comments}/>
        <Route path="/events/:userId" component ={Events}/>
        <Route path="/comments/:commentId" component ={Comment}/>
      </Switch>
    </div>)
}

export default MainRouter
