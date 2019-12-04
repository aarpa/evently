/* 
Parent component: Event
Objective: To render a list of users who are invited to an event
Browser URL: /events/:eventId/view-guests
Backend API: /events/<event_id>/invites
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

    $.get(apiUrl, response => this.setState({ invites: response.users }));
  }


  render() {
    let invites = this.state.invites;

    let guestList = [];
    let rsvp_status = 'No response yet';

    for (let invite of invites) {

      if (invite.rsvp !== null) {
        rsvp_status = invite.rsvp
      }

      guestList.push(
        <div key={invite.user.user_id}>
          <p>{invite.user.name}</p>
          <p>RSVP Status: {rsvp_status}</p>
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