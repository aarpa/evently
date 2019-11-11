import React from 'react';
import './Credentials.css';

class Credentials extends React.Component {
	render() {
		return (
			<div className="credentials">
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
			</div>
		);
	}
}

export default Credentials;