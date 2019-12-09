/* 
Parent component: Profile
Objective: To render a list of events that a user is invited to
Browser URL: /user/:userId/invites
Backend API: /user/<user_id>/invites
*/

import React from 'react';
import { 
  Link,
} from "react-router-dom";
import $ from "jquery";


class Invites extends React.Component {
  constructor(props) {
    super(props);
    this.state = { invitedEvents: [] }
  }

  componentDidMount() {
    // let apiUrl = `/users/${this.props.match.url}/hosted-events`
    let apiUrl = this.props.match;

    $.get(apiUrl, response => this.setState({ invitedEvents: response }));
  }

  render() {
    let invitedEvents = this.state.invitedEvents;

    let eventsList = [];

    for (let eventObj of invitedEvents) {
      let redirectUrl = `/events/${eventObj.event.event_id}`;

      // eventObj has a key called 'event' that contains a nested obj
      eventsList.push(
        <div key={eventObj.event.event_id}>
          <Link to={redirectUrl}>{eventObj.event.title}</Link>
        </div>
      );
    }

    if (eventsList === []) {
      return (<p>"No upcoming invites."</p>)
    } else {
      return (
        <div className="invites">
          {eventsList}
        </div>        
      );
    }

  }
}

export default Invites;