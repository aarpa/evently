// ***Main Component*** //

import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import './App.css'
import Login from '../Home/Login';
import Logout from '../Home/Logout';
import Signup from '../Home/Signup';
import Profile from '../Profile/Profile';
import Event from '../Event/Event';
import EventForm from '../EventForm/EventForm';


class App extends React.Component {
  constructor() {
    super();
    this.state = { user: undefined }
  }

  renderLoginButton = () => {
    return (
      <div className="menu-items">
        <Link to="/login">Log in</Link>
        <Link to='/signup'>Sign Up</Link>
      </div>
    );
  }

  renderLogoutButton = () => {
    return (
      <div className="menu-items">
        <Logout user={this.state.user} onLogout={this.handleLogout} />
      </div>
    );
  }

  handleLogin = (user) => {
    this.setState({ user: user });
  }


  handleLogout = () => {
    this.setState({ user: undefined });
  }


  render() {
    let toRender;

    const user = this.state.user;

    if (user !== undefined) {
      toRender = this.renderLogoutButton();
    } else {
      toRender = this.renderLoginButton();

      // let redirectUrl = '/'
      // <Redirect to={redirectUrl} />
    }

    return (
      <Router>
        <div className="app">
          <div className="navbar">
            <div className="home" >
              <Link to="/">Evently</Link>
            </div>
              {toRender}
          </div>

          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route path='/login'>
              <Login user={this.state.user} onLogin={this.handleLogin} />
            </Route>
            <Route path='/signup'>
              <Signup user={this.state.user} onSignup={this.handleLogin} />
            </Route>
            <Route path="/users/:userId" component={Profile} />
            <Route path="/create-event" component={EventForm} />
            <Route
              path="/events/:eventId"
              render={(props) => <Event {...props} user={this.state.user} />}
            />
          </Switch>

          {!user && <Redirect to='/' />}
        </div>
      </Router>
    );
  }
}

function Homepage() {
  return (
    <div className="landing">
      <h1>Welcome to Evently!</h1>
    </div>
  );
}


export default App;