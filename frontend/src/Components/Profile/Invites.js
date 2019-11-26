import React from 'react';
import { 
  Link,
  // useRouteMatch
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
        <div>
          <Link to={redirectUrl}>{eventObj.event.title}</Link>
          <p>Start Time and Date: {eventObj.event.start_on}</p>
          <p>End Time and Date: {eventObj.event.end_on}</p>
        </div>
      );
    }

    if (eventsList === []) {
      return (<p>"No upcoming invites."</p>)
    } else {
      return (
        <div>
          {eventsList}
        </div>        
      );
    }

  }
}

export default Invites;