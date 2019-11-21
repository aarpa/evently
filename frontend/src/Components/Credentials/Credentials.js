import React from "react";
import './Credentials.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";


export default function Credentials() {
	return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/login">Log In</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
        </ul>

        <hr />

        <Switch>
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

function Login() {
  return (
    <div>
      <h1>Sign in to Evently</h1>
      <form action='/login'>
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