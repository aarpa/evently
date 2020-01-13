/* 
Parent component: App
Objective: To render form for user to create an account --> once created, redirects to that user's profile page
Browser URL: /signup
Backend API: /users --> POST method
*/

import React from "react";
import $ from "jquery";
import { Redirect } from "react-router-dom";


class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      dob: '',
      email: '',
      password: ''
    };
  }

  handleChange = (event) => {
    let newState = {}

    let name = event.target.name;
    let value = event.target.value; 
    
    newState[name] = value;

    this.setState(newState);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    
    $.post('/users', this.state, (response) => {

      this.props.onSignup(response)
    });
  }


  render() {
    if (this.props.user) {
      let redirectUrl = `/users/${this.props.user}`
      return <Redirect to={redirectUrl} />
    }

    return (
      <div className="signup-form">
        <h1 className="form-title">Create an account</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-field">
            <p>Name</p>
            <input name="name" type="text" value={this.state.name} onChange={this.handleChange} />
          </div>
          <div className="form-field">
            <p>Phone Number</p>
            <input name="phone" type="tel" value={this.state.phone} onChange={this.handleChange} />
          </div>
          <div className="form-field">
            <p>Date of Birth</p>
            <input name="dob" type="text" value={this.state.dob} onChange={this.handleChange} />
          </div>
          <div className="form-field">
            <p>Email</p>
            <input name="email" type="text" value={this.state.email} onChange={this.handleChange} />
          </div>
          <div className="form-field">
            <p>Password</p>
            <input name="password" type="password" value={this.state.password} onChange={this.handleChange} />
          </div>
          <div className="form-field  submit-button">
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
  }
}

export default Signup;