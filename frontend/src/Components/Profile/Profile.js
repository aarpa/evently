/* 
Parent component: App
Objective: To render a user's profile page --> has bio & upcoming events as child components
Browser URL: /users/:userId
Backend API: /users/<user_id>
*/

import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import Bio from './Bio';
import HostedEvents from './HostedEvents';
import Invites from './Invites';


export default function Profile() {
  let { url } = useRouteMatch();
  return (
      <div className="profile">
        <Route path="/users/:userId" component={Bio} />

        <div className="user-events">
          <Link to={`${url}/hosted-events`}>Events You're Hosting</Link>
          <Link to={`${url}/invites`}>Events You're Invited To</Link>
          <Link to="/create-event">Create a New Event</Link>
        </div>

        <hr />

        <Switch>
          <Route path={`${url}/hosted-events`} component={HostedEvents} />
          <Route path={`${url}/invites`} component={Invites} />
        </Switch>
      </div>
  );
}