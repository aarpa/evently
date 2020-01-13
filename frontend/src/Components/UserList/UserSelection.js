/* 
Parent component: Event
Objective: To render a list of users to select with checkboxes
Browser URL: /events/:eventId/invite-guests
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
    const userId = parseInt(event.target.id);   // convert from str to int
    const checkedUsers = this.state.checkedUsers;

    // use Set methods to add or remove user depending on if checked or not
    if (checkedUsers.has(userId)) {
      checkedUsers.delete(userId)
    } else {
      checkedUsers.add(userId)
    }

    // set state with final array of users whose boxes are checked
    this.setState({ checkedUsers: checkedUsers })
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const url = `/events/${this.props.eventId}/invites`;

    const reqBody = {userIds: Array.from(this.state.checkedUsers)}
    const reqBodyJson = JSON.stringify(reqBody)

    // $.post(`/events/${this.props.eventId}/invites`, reqBodyJson, () => {})
    // jQuery wasn't working --> couldn't get request payload to be a JSON object -- need to look more into why

    // this is an alternate way to make POST request
    fetch(url, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: reqBodyJson // body data type must match "Content-Type" header
    }).then(response => {
      this.setState({ success: true })
    });
  }

  render() {
    if (this.state.success) {
      return (<p>New invitations were successfully sent!</p>) 
    }

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
          <label htmlFor={user.user_id}>{user.name}</label>
        </div>
      );
    }

    return (
      <form onSubmit={this.handleSubmit}>
        {usersToRender}
        <input type="submit" value="Submit"></input>
      </form>
    );
  }
}

export default UserSelection;