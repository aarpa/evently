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
    let apiUrl = `${this.props.url}/invites`;
    // let apiUrl = `/${path}/invites`

    $.get(apiUrl, response => this.setState({ invites: response }));
  }


  render() {
    let invites = this.state.invites;

    let guestList = [];

    for (let invite of invites) {
      guestList.push(
        <div key={invite.user.user_id}>
          <li>{invite.user.name}</li>
        </div>
      );
    }

    if (guestList === []) {
      return (<p>"No one is invited to this event yet."</p>)
    } else {
      return (
        <div>
          {guestList}
        </div>        
      );
    }
  }
}

export default GuestList;