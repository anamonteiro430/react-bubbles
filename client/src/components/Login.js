import React, { useState } from 'react';

const Login = () => {
	const { credentials, setCredentials } = useState({
		username: '',
		password: ''
	});

	// make a post request to retrieve a token from the api
	// when you have handled the token, navigate to the BubblePage route
	const handleSubmit = e => {
		e.preventDefault();
	};

	return (
		<div>
			<h1>Welcome to the Bubble App!</h1>
			<p>Build a login page here</p>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					name='username'
					value={credentials.username}
					onChange={handleChanges}
				/>
				<input
					type='password'
					name='password'
					value={credentials.password}
					onChange={handleChanges}
				/>
			</form>
		</div>
	);
};

export default Login;
