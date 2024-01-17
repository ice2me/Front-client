import React from 'react'

const ToggleView = ({toggleView, toggleViewHandler}) => {
	return (
		<div className='home-wrapper_header-view_buttons'>
			<button
				className={`home-wrapper_header-view_list ${toggleView === true ? 'active-list-view' : ''}`}
				title='List view'
				onClick={() => toggleViewHandler(true)}
			/>
			<button
				className={`home-wrapper_header-view_block ${toggleView === false ? 'active-block-view' : ''}`}
				title='Block view'
				onClick={() => toggleViewHandler(false)}
			/>
		</div >
	)
}

export default ToggleView