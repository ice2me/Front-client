import React from 'react'

const AlertForAddProductInBasket = ({name, count, unit, countButton}) => {
	return (
		// <div className='alertForAddProductInBasket'>
		<div className='alertForAddProductInBasket-wrapper'>
				{
					countButton
						?
						<h2 className='alertForAddProductInBasket-wrapper_text'>
							Кількість {name} змінено - {count} {unit}
						</h2 >
						:
						<>
							<h2 className='alertForAddProductInBasket-wrapper_text'>
								{name} - {count} {unit}
							</h2 >
							<h3 className='alertForAddProductInBasket-wrapper_subtext'>
							- додано до кошика!
							</h3 >
						</>
				}
			</div >
		// </div >
	)
}

export default AlertForAddProductInBasket