import React, { useState } from 'react';
import axios from 'axios';

class Login extends React.Component {
	state = {
		credentials: {
			username: '',
			password: ''
		}
	};

	handleChanges = e => {
		this.setState({
			credentials: {
				...this.state.credentials,
				[e.target.name]: e.target.value
			}
		});
	};

	// make a post request to retrieve a token from the api
	// when you have handled the token, navigate to the BubblePage route

	handleSubmit = e => {
		e.preventDefault();
		axios
			.post('http://localhost:5000/api/login', this.state.credentials)
			.then(res => {
				localStorage.setItem('token', res.data.payload);
				this.props.history.push('/bubbles');
			})
			.catch(err => console.log(err));
	};

	render() {
		return (
			<div>
				<h1>Welcome to the Bubble App!</h1>
				<p>Build a login page here</p>
				<form onSubmit={this.handleSubmit}>
					<input
						type='text'
						name='username'
						value={this.state.credentials.username}
						onChange={this.handleChanges}
					/>
					<input
						type='password'
						name='password'
						value={this.state.credentials.password}
						onChange={this.handleChanges}
					/>
					<button>Let me in!</button>
				</form>
			</div>
		);
	}
}

export default Login;
