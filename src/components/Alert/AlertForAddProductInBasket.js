import React from 'react'

const AlertForAddProductInBasket = ({name, count, unit}) => {
	return (
		<div className='alertForAddProductInBasket'>
			<div className='alertForAddProductInBasket-wrapper'>
				<h2 className='alertForAddProductInBasket-wrapper_text'>
					{name} {count} {unit}
				</h2 >
				<h3 className='alertForAddProductInBasket-wrapper_subtext'>
					- додано до кошика!
				</h3 >
			</div >
		</div >
	)
}

export default AlertForAddProductInBasket