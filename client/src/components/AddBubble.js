import React from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

class AddBuble extends React.Component {
	state = {
		color: '',
		hex: '',
		id: ''
	};

	handleChanges = e => {
		this.setState({
			...this.state,
			[e.target.name]: e.target.value
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		axiosWithAuth()
			.post('/colors', this.state)
			.then(res => {
				console.log('here', this.state);
				console.log(this.props);
				this.props.updateColors([
					...this.props.colors,
					{
						color: this.state.color,
						code: {
							hex: this.state.hex
						},
						id: this.state.id
					}
				]);
				console.log(res.data);
			})
			.catch(err => console.log(err));
	};

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<input
					type='text'
					placeholder='name your color'
					name='color'
					value={this.state.color}
					onChange={this.handleChanges}
				/>
				<input
					type='text'
					placeholder='hex'
					name='hex'
					value={this.state.hex}
					onChange={this.handleChanges}
				/>
				<input
					type='text'
					placeholder='number'
					name='id'
					value={this.state.id}
					onChange={this.handleChanges}
				/>
				<button>Add</button>
			</form>
		);
	}
}

export default AddBuble;
