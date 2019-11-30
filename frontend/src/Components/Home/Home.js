/* 
Parent component: App
Objective: To render option to log in or sign up
Browser URL: /
Backend API: None
*/

import React from "react";
import {
  Link
} from "react-router-dom";


export default function Credentials() {
	return (
    <div>
      <ul>
        <li>
          <Link to='/login'>Log In</Link>
        </li>
        <li>
          <Link to='/signup'>Sign Up</Link>
        </li>
      </ul>
    </div>
  );
}