import React from 'react';
import './Credentials.css';

class Credentials extends React.Component {
	constructor() {
		super();
		this.state = { tab: 'login' };
	}

	renderLogin = () => {
		return (
			<div className="login">
				<h3>Log In</h3>
				<form>
					<h4>Email</h4>
					<input type="text" name="email"></input>
					<h4>Password</h4>
					<input type="text" name="password"></input>
					<p>
						<input type="submit" name="Submit"></input>
					</p>
				</form>
			</div>
		);
	}

	renderSignup = () => {
		return (
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
					<p>
						<input type="submit" name="Submit"></input>
					</p>
				</form>
			</div>
		);
	}

	changeTabToLogin = () => {
		this.setState({tab: 'login'})
	}

	changeTabToSignup = () => {
		this.setState({tab: 'signup'})
	}

	render() {
		let tab = this.state.tab;
		let toRender;

		if (tab === 'login') {
			toRender = this.renderLogin();
		} else {
			toRender = this.renderSignup();
		}

		return (
			<div className="credentials">
				<div>
					<button onClick={this.changeTabToLogin}>Log In</button>
					<button onClick={this.changeTabToSignup}>Sign Up</button>
					{toRender}
				</div>
			</div>
		);
	}
}

export default Credentials;