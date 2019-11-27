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
  useRouteMatch,
  useParams
} from "react-router-dom";
import EventDetails from './EventDetails';
import GuestList from './GuestList';
import UserList from '../UserList/UserList'


export default function Event() {
  console.log(useRouteMatch())
  let { url } = useRouteMatch();
  let { eventId } = useParams();

  return (
    <div>
      <EventDetails eventId={eventId} />

      <ul>
        <li>
          <Link to={`${url}/view-guests`}>View Invited Guests</Link>
        </li>
        <li>
          <Link to={`${url}/invite-guests`}>Invite New Guests</Link>
        </li>
      </ul>

      <hr />

      <Switch>
        <Route path={`${url}/view-guests`}>
          <GuestList url={url} />
        </Route>
        <Route path={`${url}/invite-guests`}>
          <UserList />
        </Route>
      </Switch>
    </div>
    
  );
}