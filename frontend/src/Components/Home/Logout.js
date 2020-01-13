/* 
Parent component: Credentials
Objective: To render form for user to log out --> once logged out, redirects to homepage
Browser URL: 
Backend API:
*/

import React from "react";
import $ from "jquery";
import { Redirect, Link } from "react-router-dom";


class Logout extends React.Component {
  handleClick = () => {
    $.post('/logout', (response) => {
      this.props.onLogout();
    });
  }


  render() {
    return (
      <div>
        <a onClick={this.handleClick}>Logout</a>
        <Link to={`/users/${this.props.user}`}>👤</Link>
      </div>
    );
  }
}

export default Logout;