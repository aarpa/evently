/* 
Parent component: Credentials
Objective: To render form for user to log in --> once logged in, redirects that user's page
Browser URL: /login
Backend API: /login
*/

import React from "react";
import $ from "jquery";
import { Redirect } from "react-router-dom";


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  handleChange = (event) => {
    let newState = {}

    let name = event.target.name;
    let value = event.target.value; 
    
    newState[name] = value

    this.setState(newState);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    
    $.post('/login', this.state, (response) => {
      this.props.onLogin(response);

      // Call the helper function to save the user in loginInfo module
      // setLoggedInUser(response);
      // this.setState({user: response});
    });
  }


  render() {
    if (this.props.user) {
      let redirectUrl = `/users/${this.props.user}`
      return <Redirect to={redirectUrl} />
    }

    return (
      <div className="login-form">
        <h1 className="form-title">Log in to your account</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-field">
            <p>Email</p>
            <input name="email" type="text" value={this.state.email} onChange={this.handleChange} />
          </div>
          <div className="form-field">
            <p>Password</p>
            <input name="password" type="password" value={this.state.password} onChange={this.handleChange} />
          </div>
          <div className="form-field submit-button">
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
  }
}

export default Login;