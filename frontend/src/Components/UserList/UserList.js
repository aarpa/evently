/* 
Parent component: App
Objective: To render a list of users
Browser URL: /users
Backend API: /users
*/

import React from 'react';
import $ from "jquery";
import { Link } from "react-router-dom";


class UserList extends React.Component {
  constructor(props) {
    super(props)  
    this.state = { users: [] }
  }

  componentDidMount() {
    $.get('/users', response => this.setState({ users: response }));
  }

  render() {
    let users = this.state.users;

    let userListItems = [];

    for (let user of users) {
      let redirectUrl = `/users/${user.user_id}`;

      userListItems.push(<li key={user.user_id}><Link to={redirectUrl}>{user.name}</Link></li>);
    }

    return (
      <div>
        <h2>Full List of Users</h2>
        <ul>
          {userListItems}
        </ul>
      </div>
    );
  }
}

export default UserList;
