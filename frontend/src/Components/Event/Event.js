/* 
Parent component: App
Objective: To render an event page --> has details and guest list as child components
Browser URL: /events/:eventId
Backend API: /events/<event_id>
*/

import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import EventDetails from './EventDetails';
import GuestList from './GuestList';


export default function Event() {
  let { url } = useRouteMatch();
  return (
    <Router>
      <div>
        <Route path="/events/:eventId" component={EventDetails} />

        <ul>
          <li>
            <Link to={`${url}/invite-guests`}>Invite Guests</Link>
          </li>
        </ul>

        <hr />

        <Switch>
          <Route path={`${url}/invite-guests`}>
            <GuestList url={url} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}