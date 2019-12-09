// ***Main Component*** //

import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import './App.css'
import Login from '../Home/Login';
import Signup from '../Home/Signup';
import Profile from '../Profile/Profile';
import Event from '../Event/Event';
import EventForm from '../EventForm/EventForm';


export default function App() {
  return (
    <Router>
      <div className="app">
        <div className="navbar">
          <div className="home" >
            <Link to="/">Evently</Link>
          </div>
          <div className="menu-items">
            <Link to="/login">Log in</Link>
            <Link to='/signup'>Sign Up</Link>
            <Link to="/create-event">Create a New Event</Link>
          </div>
        </div>

        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <Route path="/users/:userId" component={Profile} />
          <Route path="/create-event" component={EventForm} />
          <Route path="/events/:eventId" component={Event} />
        </Switch>
      </div>
    </Router>
  );
}

function Homepage() {
  return (
    <div className="landing">
      <h1>Welcome to Evently!</h1>
    </div>
  );
}