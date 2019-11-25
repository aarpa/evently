import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  // useRouteMatch
} from "react-router-dom";
// import $ from "jquery";
import Credentials from '../Credentials/Credentials';
import UserList from '../UserList/UserList';
import EventForm from '../EventForm/EventForm';
import Event from '../Event/Event';


export default function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
          <li>
            <Link to="/create-event">Create a New Event</Link>
          </li>
        </ul>

        <hr />

        <Switch>
          <Route exact path="/">
            <Credentials />
          </Route>
          <Route exact path="/users">
            <UserList />
          </Route>
          <Route path="/users/:userId">
            <Profile />
          </Route>
          <Route path="/create-event">
            <EventForm />
          </Route>
          <Route path="/events/:eventId" component={Event} />
        </Switch>
      </div>
    </Router>
  );
}

function Profile() {
  let {user_id} = useParams();

  return (
    <div>
      Hello, I'm the profile page. My Id is {user_id}
    </div>
  );
}

