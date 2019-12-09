/* 
Parent component: Profile
Objective: To render a list of events that a user is hosting
Browser URL: /user/:userId/hosted-events
Backend API: /user/<user_id>/hosted-events
*/

import React from 'react';
import { 
  Link,
  Redirect
} from "react-router-dom";
import $ from "jquery";


class HostedEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hostedEvents: [] }
  }

  componentDidMount() {
    let apiUrl = this.props.match;

    $.get(apiUrl, response => this.setState({ hostedEvents: response }));
  }

  render() {
    let hostedEvents = this.state.hostedEvents;

    let eventsList = [];

    for (let event of hostedEvents) {
      let redirectUrl = `/events/${event.event_id}`;
      console.log(redirectUrl)


      eventsList.push(
        <div key={event.event_id}>
          <Link to={redirectUrl}>{event.title}</Link>
        </div>
      );

    }

    if (eventsList.length === 0) {
      return (<p>No upcoming events hosted by you.</p>)
    } else {
      return (
        <div className="hosted-events">
          {eventsList}
        </div>        
      );
    }
  }
}

export default HostedEvents;