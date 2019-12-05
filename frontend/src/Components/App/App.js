// ***Main Component*** //

import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  // useRouteMatch
} from "react-router-dom";
// import $ from "jquery";
import './App.css'
import Home from '../Home/Home';
import Login from '../Home/Login';
import Signup from '../Home/Signup';
import UserList from '../UserList/UserList';
import Profile from '../Profile/Profile';
import EventForm from '../EventForm/EventForm';
import Event from '../Event/Event';


export default function App() {
  return (
    <Router>
      <div>
        <ul className="navbar">
          <li>
            <Link className="menu-item" to="/">Home</Link>
          </li>
          <li>
            <Link className="menu-item" to="/users">Users</Link>
          </li>
          <li>
            <Link className="menu-item" to="/create-event">Create a New Event</Link>
          </li>
        </ul>
        
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <Route exact path="/users" component={UserList} />
          <Route path="/create-event" component={EventForm} />
          <Route path="/events/:eventId" component={Event} />
          <Route path="/users/:userId" component={Profile} />
        </Switch>
      </div>
    </Router>
  );
}