import React, { useState } from 'react'
import { useDispatch } from "react-redux"
import DefaultPhoto from "../../assets/images/default-no-photo.png"
import { pushCardToBasket } from "../../redux/slices/categoriesSlice"
import AlertForAddProductInBasket from "../Alert/AlertForAddProductInBasket"

const ProductInfo = ({
	hide,
	item
}) => {
	const [countValue, setCountValue] = useState(1)
	const dispatch = useDispatch()
	const [alertForAddProductInBasket, setAlertForAddProductInBasket] = useState(false)

	const countPlus = () => setCountValue(countValue + 1)
	const countMinus = () => countValue > 1 && setCountValue(countValue - 1)

	const pushCardInBasket = () => {
		setAlertForAddProductInBasket(true)
		const tehData = {
			count: countValue,
			total_price: item?.price_product * countValue,
			unit_product: item.unit_product
		}
		dispatch(pushCardToBasket({...item, ...tehData}))
		setTimeout(() => {
			setAlertForAddProductInBasket(false)
			hide()
		}, 1500)
	}

	if (alertForAddProductInBasket) {
		return <AlertForAddProductInBasket
			name={item?.name_product}
			count={countValue}
			unit={item.unit_product}
		/>
	}

	return (
		<div className='product-info'>
			<div className='product-info_wrapper'>
				<div className='product-info_wrapper-title'>
					<button
						className='cardForProduct-header_title-top_button'
						onClick={hide}
					>
							Назад до продуктів
						</button >
				</div >
				<div className='product-info_wrapper-content'>
					<div className='product-info_wrapper-content_top'>
						<div
							className='product-info_wrapper-content_top-photo'
							style={
								item?.image_product
									?
									{backgroundImage: `url(${item?.image_product})`}
									:
									{backgroundImage: `url(${DefaultPhoto})`}
							}
						></div >
						<div className='product-info_wrapper-content_top-body'>
							<h2 className='product-info_wrapper-content_top-body_title'>{item?.name_product}</h2 >
							<div className='product-info_wrapper-content_top-body_block'>
								<span className='product-info_wrapper-content_top-body_block-price'>
									{`${item?.price_product} ${item?.currency_product}`}
								</span >
								<span className='product-info_wrapper-content_top-body_block-price'>
									{`За 1 ${item?.unit_product}`}
								</span >
							</div >
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
						</div >
					</div >
					<div className='product-info_wrapper-content_bottom'>
						<h3 className='product-info_wrapper-content_bottom-title'>Про товар</h3 >
						<p className='product-info_wrapper-content_bottom-text'>
							{item?.description_product !== '' ? item?.description_product : 'Про товар нічого немає...'}
						</p >
					</div >
				</div >
			</div >

			{/* MOB----------------->>>> */}
			<div className='product-infoMob_wrapper'>
				<div className='product-infoMob_wrapper-title'>
					<button
						className='cardForProduct-header_title-top_button'
						onClick={hide}
					>
							Назад до продуктів
						</button >
				</div >
				<div className='product-infoMob_wrapper-content'>
					<div className='product-infoMob_wrapper-content_top'>
						<div className='product-infoMob_wrapper-content_top-body'>
							<h2 className='product-infoMob_wrapper-content_top-body_title'>{item?.name_product}</h2 >
							<div
								className='product-infoMob_wrapper-content_top-photo'
								style={
									item?.image_product
										?
										{backgroundImage: `url(${item?.image_product})`}
										:
										{backgroundImage: `url(${DefaultPhoto})`}
								}
							></div >
							<div className='product-infoMob_wrapper-content_top-body_block'>
								<span className='product-infoMob_wrapper-content_top-body_block-price'>
									{`За 1 ${item?.unit_product}`}
								</span >
								<span className='product-infoMob_wrapper-content_top-body_block-price'>
									{`${item?.price_product} ${item?.currency_product}`}
								</span >
							</div >
							<div className='product-infoMob_wrapper-content_top-body_block'>
									<div className='product-infoMob_wrapper-content_top-body_block-counter'>
									<button
										className='product-infoMob_wrapper-content_top-body_block-counter_minus'
										onClick={countMinus}
									>-</button >
									<p className='product-infoMob_wrapper-content_top-body_block-counter_num'>{countValue}</p >
									<button
										className='product-infoMob_wrapper-content_top-body_block-counter_plus'
										onClick={countPlus}
									>+</button >
								</div >
								<span className='product-infoMob_wrapper-content_top-body_block-count'>
									{
										`${item?.price_product * countValue} ${item?.currency_product}`
									}
								</span >
							</div >
							<button
								className='product-infoMob_wrapper-content_top-body_basket cardForProduct-card_header-button'
								onClick={pushCardInBasket}
							>
								До кошика
							</button >
						</div >
					</div >
					<div className='product-infoMob_wrapper-content_bottom'>
						<h3 className='product-infoMob_wrapper-content_bottom-title'>Про товар</h3 >
						<p className='product-infoMob_wrapper-content_bottom-text'>
							{item?.description_product !== '' ? item?.description_product : 'Про товар нічого немає...'}
						</p >
					</div >
				</div >
			</div >
		</div >
	)
}

export default ProductInfo