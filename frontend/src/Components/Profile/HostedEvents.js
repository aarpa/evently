import React from 'react';
import { 
  Link,
  // useRouteMatch
} from "react-router-dom";
import $ from "jquery";


class HostedEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hostedEvents: [] }
  }

  componentDidMount() {
    // let apiUrl = `/users/${this.props.match.url}/hosted-events`
    let apiUrl = this.props.match;

    $.get(apiUrl, response => this.setState({ hostedEvents: response }));
  }

  render() {
    let hostedEvents = this.state.hostedEvents;

    let eventsList = [];

    for (let event of hostedEvents) {
      let redirectUrl = `/events/${event.event_id}`;

      // event is an object, so each attribute is a direct key 
      eventsList.push(
        <div>
          <Link to={redirectUrl}>{event.title}</Link>
          <p>Start Time and Date: {event.start_on}</p>
          <p>End Time and Date: {event.end_on}</p>
        </div>
      );
    }

    if (eventsList === []) {
      return (<p>"No upcoming events hosted by you."</p>)
    } else {
      return (
        <div>
          {eventsList}
        </div>        
      );
    }

  }
}

export default HostedEvents;