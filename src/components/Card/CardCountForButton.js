import React from "react"
import AlertForAddProductInBasket from "../Alert/AlertForAddProductInBasket"

const CardCountForButton = ({
	item,
	countPlus,
	countMinus,
	countValue,
	alertForAddProductInBasket,
	addStatus,
	removeProductFromBasket
}) => {
	return (
		<>
			<div className='product-info_wrapper-content_top-body_block-counter'>
				{
					countValue === 1
						?
						<button
							className='product-info_wrapper-content_top-body_block-counter_remove'
							onClick={() => removeProductFromBasket(item?._id)}
						></button >
						:
						<button
							className='product-info_wrapper-content_top-body_block-counter_minus'
							onClick={countMinus}
						>-</button >
				}
				<p className='product-info_wrapper-content_top-body_block-counter_num'>{countValue}</p >
				<button
					className='product-info_wrapper-content_top-body_block-counter_plus'
					onClick={countPlus}
				>+</button >
			</div >
			{alertForAddProductInBasket && <AlertForAddProductInBasket
				name={item?.name_product}
				count={countValue}
				unit={item.unit_product}
				countButton={addStatus}
			/>}
    </ >
	)
}

export default CardCountForButton