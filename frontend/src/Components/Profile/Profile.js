import React from 'react';
// import {
//   useParams
// } from "react-router-dom";
import $ from "jquery";


class Profile extends React.Component {
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

export default Profile;