import React from 'react'
import AddPlus from '../../assets/icons/add-plus-icon.svg'

const ButtonForAdd = ({title }) => {
	return (
		<button className='buttonAdd'>
			<span className='buttonAdd-title'>{title}</span>
			<img
				className='buttonAdd-icon'
				src={AddPlus}
				alt={title}
				title={title}
			/>
		</button >
	)
}

export default ButtonForAdd