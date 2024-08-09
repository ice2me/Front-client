import React, { useState } from 'react'
import { useDispatch } from "react-redux"
import DefaultPhoto from "../../assets/images/default-no-photo.png"
import { pushCardToBasket } from "../../redux/slices/categoriesSlice"
import AlertForAddProductInBasket from "../Alert/AlertForAddProductInBasket"
import CounterForCard from "./CounterForCard"

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
		}, 2000)
	}

	if (alertForAddProductInBasket) {
		return <AlertForAddProductInBasket
			name={item?.name_product}
			count={countValue}
			unit={item.unit_product}
			countButton={false}
		/>
	}

	return (
		<div className='product-info'>
			<div className='product-info_wrapper'>
				<div className='product-info_wrapper-title'>
					<button
						className='cardForProduct-header_title-top_button'
						style={{width: 'max-content'}}
						onClick={hide}
					>
							<span style={{marginLeft: '30px'}}>Закрити опис товару {item?.name_product}</span>
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
							<CounterForCard
								item={item}
								countValue={countValue}
								countMinus={countMinus}
								countPlus={countPlus}
								pushCardInBasket={pushCardInBasket}
							/>
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
							<CounterForCard
								item={item}
								countValue={countValue}
								countMinus={countMinus}
								countPlus={countPlus}
								pushCardInBasket={pushCardInBasket}
							/>
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