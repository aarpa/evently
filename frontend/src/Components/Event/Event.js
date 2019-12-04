/* 
Parent component: App
Objective: To render an event page --> has details and guest list as child components
Browser URL: /events/:eventId
Backend API: /events/<event_id>
*/

import React from "react";
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import { getLoggedInUser } from '../../util/loginInfo'
import EventDetails from './EventDetails';
import GuestList from './GuestList';
import UserSelection from '../UserList/UserSelection';
import $ from "jquery";


class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = { eventDetails: {} }
  }

  componentDidMount() {
    let eventId = this.props.match.params.eventId;
    let apiUrl = `/events/${eventId}`
    
    $.get(apiUrl, response => this.setState({ eventDetails: response }))
  }


  renderInviteLink = (url) => {
    // call helper function to extract out the user saved in the loginInfo module
    const user = getLoggedInUser();

    if (user === this.state.eventDetails.host) {
      return <li><Link to={`${url}/invite-guests`}>Invite New Guests</Link></li>;
    } else {
      return null;
    }
  }

  render() {
    let url = this.props.match.url;
    let eventId = this.props.match.params.eventId;

    return (
      <div>
        <EventDetails eventDetails={this.state.eventDetails} />

        <ul>
          <li><Link to={`${url}/view-guests`}>View Invited Guests</Link></li>
          {this.renderInviteLink(url)}
        </ul>

        <hr />

        <Switch>
          <Route path={`${url}/view-guests`}>
            <GuestList eventId={eventId} />
          </Route>
          <Route path={`${url}/invite-guests`}>
            <UserSelection eventId={eventId} />
          </Route>
        </Switch>
      </div>
    );
  }
}


export default Event;