import React from 'react';
import './Credentials.css';

class Credentials extends React.Component {
	render() {
		return (
			<div className="credentials">
				<div>
					<div className="login">
						<h3>Log In</h3>
						<form>
							<h4>Email</h4>
							<input type="text" name="email"></input>
							<h4>Password</h4>
							<input type="text" name="password"></input>
							<input type="submit" name="Submit"></input>
						</form>
					</div>
					<div className="signup">
						<h3>Sign Up</h3>
						<form>
							<h4>First and Last Name</h4>
							<input type="text" name="name"></input>
							<h4>Phone Number</h4>
							<input type="text" name="phone"></input>
							<h4>Date of Birth</h4>
							<input type="text" name="dob"></input>
							<h4>Email</h4>
							<input type="text" name="email"></input>
							<h4>Choose a Password</h4>
							<input type="text" name="password"></input>
							<input type="submit" name="Submit"></input>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default Credentials;