// ***Main Component*** //

import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import './App.css'
// import Home from '../Home/Home';
import Login from '../Home/Login';
import Signup from '../Home/Signup';
import UserList from '../UserList/UserList';
import Profile from '../Profile/Profile';
import Event from '../Event/Event';


export default function App() {
  return (
    <Router>
      <div>
        <ul className="navbar">
          <li>
            <Link className="menu-item" to="/">Evently</Link>
          </li>
          <li>
            <Link className="menu-item" to="/login">Login</Link>
          </li>
          <li>
            <Link className="menu-item" to='/signup'>Sign Up</Link>
          </li>
        </ul>

        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <Route path="/events/:eventId" component={Event} />
          <Route exact path="/users/:userId" component={Profile} />
        </Switch>
      </div>
    </Router>
  );
}

function Homepage() {
  return (
    <h1 className="main-title">
      Welcome to Evently!
    </h1>
  );
}