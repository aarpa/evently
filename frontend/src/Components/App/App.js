import React from "react";
import "./App.css"
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
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
        </ul>

        <hr />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}


function Home() {
  return (
    <div>
      <h1>Welcome to Evently!</h1>
    </div>
  );
}


function Login() {
  return (
    <div>
      <h1>Sign in to Evently</h1>
      <form>
        <div>
          <p>Email</p>
          <input type="text" name="email" required></input>
        </div>
        <div>
          <p>Password</p>
          <input type="password" name="password" required></input>
        </div>
        <div>
          <input type="submit" name="Sign in"></input>
        </div>
      </form>
    </div>
  );
}


function Signup() {
  return (
    <div>
      <h1>Join Evently</h1>
      <form>
        <div>
          <p>Name</p>
          <input type="text" name="name" placeholder="Jane Doe" required></input>
        </div>
        <div>
          <p>Phone Number</p>
          <input type="tel" name="phone" placeholder="(123) 456-7890" required></input>
        </div>
        <div>
          <p>Date of Birth</p>
          <input type="date" name="dob" placeholder="mm/dd/yyyy" required></input>
        </div>
        <div>
          <p>Email</p>
          <input type="text" name="email" placeholder="janedoe@example.com" required></input>
        </div>
        <div>
          <p>Password</p>
          <input type="password" name="password" required></input>
        </div>
        <div>
          <input type="submit" name="Submit"></input>
        </div>
      </form>
    </div>
  );
}

