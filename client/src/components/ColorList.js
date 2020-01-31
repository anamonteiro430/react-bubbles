import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const initialColor = {
	color: '',
	code: { hex: '' }
};

const ColorList = ({ colors, updateColors }) => {
	const [editing, setEditing] = useState(false);
	const [colorToEdit, setColorToEdit] = useState(initialColor);
	const id = colorToEdit.id;

	//if there's color to edit set it to this one
	useEffect(() => {
		if (colorToEdit) {
			setColorToEdit(colorToEdit);
		}
	}, [colors, id]);

	//sets color to the id, set that color to the colorToEdit
	const editColor = color => {
		console.log('edit', id);
		setEditing(true);
		setColorToEdit(color);
	};

	const saveEdit = e => {
		e.preventDefault();
		console.log('iddddd', id);
		console.log('col', colorToEdit);
		// Make a put request to save your updated color
		// think about where will you get the id from...
		// where is is saved right now?
		axiosWithAuth()
			.put(`http://localhost:5000/api/colors/${id}`, colorToEdit)
			.then(res => {
				console.log(res);
				setColorToEdit(res.data);
			})
			.catch(err => console.log(err));
	};

	const deleteColor = color => {
		// make a delete request to delete this color
		console.log('deleting');
		axiosWithAuth()
			.delete(`http://localhost:5000/api/colors/${id}`)
			.then(res => {
				console.log(res.data);
				const newcolors = colors.filter(c => c.id !== color.id);

				updateColors(newcolors);
			});
	};

	return (
		<div className='colors-wrap'>
			<p>colors</p>
			<ul>
				{colors.map(color => (
					<li key={color.color} onClick={() => editColor(color)}>
						<span>
							<span
								className='delete'
								onClick={e => {
									e.stopPropagation();
									deleteColor(color);
								}}
							>
								x
							</span>{' '}
							{color.color}
						</span>
						<div
							className='color-box'
							style={{ backgroundColor: color.code.hex }}
						/>
					</li>
				))}
			</ul>
			{editing && (
				<form onSubmit={saveEdit}>
					<legend>edit color</legend>
					<label>
						color name:
						<input
							onChange={e =>
								setColorToEdit({ ...colorToEdit, color: e.target.value })
							}
							value={colorToEdit.color}
						/>
					</label>
					<label>
						hex code:
						<input
							onChange={e =>
								setColorToEdit({
									...colorToEdit,
									code: { hex: e.target.value }
								})
							}
							value={colorToEdit.code.hex}
						/>
					</label>
					<div className='button-row'>
						<button type='submit'>save</button>
						<button onClick={() => setEditing(false)}>cancel</button>
					</div>
				</form>
			)}
			<div className='spacer' />
			{/* stretch - build another form here to add a color */}
		</div>
	);
};

export default ColorList;
