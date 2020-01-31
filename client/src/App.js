import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import BubblePage from './components/BubblePage';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import './styles.scss';

function App() {
	return (
		<Router>
			<div className='App'>
				<Link to='/'>Login</Link>
				<Link to='/bubbles'>See Bubbles</Link>
				<Switch>
					<PrivateRoute path='/bubbles' component={BubblePage} />
					<Route exact path='/' component={Login} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
