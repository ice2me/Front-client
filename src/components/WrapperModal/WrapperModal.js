import React from 'react'

export default function WrapperModal({children, hide, title}) {
	return (
		<div className='basket'>
			<div className='basket-wrapper'>
				<div className='product-info_wrapper-title'>
					<button
						className='cardForProduct-header_title-top_button'
						onClick={hide}
					>
						{title}
					</button >
				</div >
				{children}
			</div >
		</div >
	)
}