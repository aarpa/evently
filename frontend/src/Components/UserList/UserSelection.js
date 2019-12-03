/* 
Parent component: 
Objective: To render a list of users to select with checkboxes
Browser URL: 
Backend API: /events/<event_id>/to_invite
*/

import React from 'react';
import $ from "jquery";


class UserSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      checkedUsers: new Set()
    }
  }

  componentDidMount() {
    $.get(`/events/${this.props.eventId}/to_invite`, response => this.setState({ users: response.users }))
  }

  handleChange = (event) => {
    const userId = parseInt(event.target.id);
    const checkedUsers = this.state.checkedUsers;

    if (checkedUsers.has(userId)) {
      checkedUsers.delete(userId)
    } else {
      checkedUsers.add(userId)
    }

    this.setState({ checkedUsers: checkedUsers })
  }

  render() {
    let users = this.state.users;

    let usersToRender = [];

    for (let user of users) {
      let isChecked = false;

      if (this.state.checkedUsers.has(user.user_id)) {
        isChecked = true;
      }

      usersToRender.push(
        <div key={user.user_id}>
          <input id={user.user_id} type="checkbox" checked={isChecked} onChange={this.handleChange} />
          <label htmlFor={user.user_id}>{user.name} {user.user_id}</label>
        </div>
      );
    }

    return (
      <form>
        {usersToRender}
        <input type="submit" value="Submit"></input>
      </form>
    );
  }
}

export default UserSelection;