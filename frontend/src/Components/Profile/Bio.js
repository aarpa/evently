/* 
Parent component: Profile
Objective: To render the bio of a user --> static portion at the top of page
Browser URL: /users/:userId
Backend API: /users/<user_id>
*/

import React from 'react';
import $ from "jquery";


class Bio extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      userBio: {}
    }
  }

  componentDidMount() {
    let userId = this.props.match.params.userId;
    let apiUrl = `/users/${userId}`
    
    $.get(apiUrl, response => this.setState({ userBio: response }));
  }

  render() {
    let userBio = this.state.userBio;

    return (
        <div>
          <h1>{userBio.name}</h1>
          <p>{userBio.email}</p>
          <p>{userBio.phone}</p>
        </div>        
      );
  }
}

export default Bio;