import React from 'react'

const CounterForCard = ({item, countValue, countMinus, countPlus, pushCardInBasket}) => {
	return (
		<>
			<div className='product-info_wrapper-content_top-body_block'>
				<span className='product-info_wrapper-content_top-body_block-count'>
					{
						`${item?.price_product * countValue} ${item?.currency_product}`
					}
				</span >
				<div className='product-info_wrapper-content_top-body_block-counter'>
					<button
						className='product-info_wrapper-content_top-body_block-counter_minus'
						onClick={countMinus}
					>-</button >
					<p className='product-info_wrapper-content_top-body_block-counter_num'>{countValue}</p >
					<button
						className='product-info_wrapper-content_top-body_block-counter_plus'
						onClick={countPlus}
					>+</button >
				</div >
			</div >
			<button
				className='product-info_wrapper-content_top-body_basket cardForProduct-card_header-button'
				onClick={pushCardInBasket}
			>
				До кошика
			</button >
		</ >
	)
}

export default CounterForCard