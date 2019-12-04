/* 
Parent component: Event
Objective: To render a list of users who are invited to an event
Browser URL: /user/:userId/hosted-events
Backend API: /user/<user_id>/hosted-events
*/

import React from 'react';
// import { 
//   useRouteMatch
// } from "react-router-dom";
import $ from "jquery";


class GuestList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { invites: [] }
  }


  componentDidMount() {
    let apiUrl = `/events/${this.props.eventId}/invites`;
    // let apiUrl = `/${path}/invites`

    $.get(apiUrl, response => this.setState({ invites: response }));
  }


  render() {
    let invites = this.state.invites;

    let guestList = [];

    for (let invite of invites) {
      guestList.push(
        <div key={invite.user.user_id}>
          <p>{invite.user.name} | RSVP Status: {invite.rsvp}</p>
        </div>
      );
    }

    if (guestList.length === 0) {
      return (<p>No one is invited to this event yet!</p>)
    } else {
      return (
        <div>
          <h2>Invited Guests</h2>
          {guestList}
        </div>        
      );
    }
  }
}

export default GuestList;