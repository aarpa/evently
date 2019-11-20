import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  // useParams,
  useRouteMatch
} from "react-router-dom";
import UserList from '../UserList/UserList';



export default function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/index">Index</Link>
          </li>
        </ul>

        <hr />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/index">
            <Index />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}


function Home() {
  return (
    <div>
      <h2>Welcome to Evently!</h2>
    </div>
  );
}


function Index() {

  let { path, url } = useRouteMatch();

  return (
    <div>
      <h2>Index</h2>

      <ul>
        <li>
          <Link to={`${url}/users`}>Users</Link>
        </li>
      </ul>

      <Switch>
        <Route exact path={path}>
          <h3>Please select a topic.</h3>
        </Route>
        <Route path={`${path}/:topicId`}>
          <UserList />
        </Route>
      </Switch>

    </div>
  );
}


// function Users() {
//   fetch('/api/users').then(response => {
//     let userListItems = [];

//     for (let user of response) {
//       userListItems.push(<li>{user.name}</li>)
//     }

//     return (
//       <ul>
//         {userListItems}
//       </ul>
//     );
//   })
// }