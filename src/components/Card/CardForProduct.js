import React, { useState } from 'react'
import { useDispatch } from "react-redux"
import DefaultPhoto from "../../assets/images/default-no-photo.png"
import { deleteCardToBasket, pushCardToBasket } from "../../redux/slices/categoriesSlice"
import CardCountForButton from "./CardCountForButton"

const CardForProduct = ({
	view,
	product,
	showProductInfoHandler
}) => {
	const [showCount, setShowCount] = useState(false)
	const [countValue, setCountValue] = useState(1)
	const [alertForAddProductInBasket, setAlertForAddProductInBasket] = useState(false)
	const [addStatus, setAddStatus] = useState(false)
	const dispatch = useDispatch()

	const counterFunctionalAddBasket = e => {
		e.stopPropagation()
		setShowCount(true)
		saveChangeCard(1)
		setAlertForAddProductInBasket(true)
	}

	const countPlus = () => {
		setCountValue(countValue + 1)
		saveChangeCard(countValue + 1)
		setAlertForAddProductInBasket(true)
		setAddStatus(true)
		setTimeout(() => {
			setAddStatus(false)
		}, 2000)

	}
	const countMinus = () => {
		countValue > 1 && setCountValue(countValue - 1)
		countValue > 1 && saveChangeCard(countValue - 1)
		setAlertForAddProductInBasket(true)
		setAddStatus(true)
		setTimeout(() => {
			setAddStatus(false)
		}, 2000)

	}

	const saveChangeCard = count => {
		const tehData = {
			count: count,
			total_price: product?.price_product * count,
			unit_product: product.unit_product
		}
		dispatch(pushCardToBasket({...product, ...tehData}))
		setTimeout(() => {
			setAlertForAddProductInBasket(false)
		}, 1500)
	}

	const removeProductFromBasket = id => {
		dispatch(deleteCardToBasket(id))
		setShowCount(false)
	}

	return (
		<div
			className={`${view ? 'cardForProduct-card_list' : 'cardForProduct-card'}`}
		>
			{
				view
					?
					<>
						<div
							className='cardForProduct-card_list-image'
							onClick={() => showProductInfoHandler(product)}
							style={{backgroundImage: `url(${product?.image_product ? product?.image_product : DefaultPhoto})`}}
						>
						</div >
						<div className='cardForProduct-card_list-header'>
							<span
								className='cardForProduct-card_list-header-name'
								title={product?.name_product}
								onClick={() => showProductInfoHandler(product)}
							>
								{product?.name_product ? product?.name_product : '???'}
							</span >
							<div className='cardForProduct-card_list-header_block'>
								<div
									className='cardForProduct-card_list-header_block-content'
									onClick={() => showProductInfoHandler(product)}
								>
									<span className='cardForProduct-card_list-header_price'>
										{`${product?.price_product ? product?.price_product : '00'}${product?.currency_product ? product?.currency_product : '₴'}`}
									</span >
									<span className='cardForProduct-card_list-header_count'>
										{product?.unit_product ? `1 ${product?.unit_product}` : 'шт'}
									</span >
								</div >
								{
									showCount
										?
										<CardCountForButton
											item={product}
											countPlus={countPlus}
											countMinus={countMinus}
											countValue={countValue}
											alertForAddProductInBasket={alertForAddProductInBasket}
											addStatus={addStatus}
											removeProductFromBasket={removeProductFromBasket}
										/>
										:
										<button
											className='cardForProduct-card_list-header_button'
											onClick={counterFunctionalAddBasket}
										>
								До кошика
								</button >
								}
							</div >
						</div >
					</>
					:
					<>
						<div
							className='cardForProduct-card_image'
							style={{backgroundImage: `url(${product?.image_product ? product?.image_product : DefaultPhoto})`}}
							onClick={() => showProductInfoHandler(product)}
						>
						</div >
						<div className='cardForProduct-card_header'>
							<span
								className='cardForProduct-card_header-name'
								onClick={() => showProductInfoHandler(product)}
								title={product?.name_product}
							>
								{product?.name_product ? product?.name_product : '???'}
							</span >
							<span
								className='cardForProduct-card_header-price'
								onClick={() => showProductInfoHandler(product)}
							>
								{`${product?.price_product ? product?.price_product : '00'}${product?.currency_product ? product?.currency_product : '₴'}`}
							</span >
							<span
								className='cardForProduct-card_header-count'
								onClick={() => showProductInfoHandler(product)}
							>
								{
									product?.unit_product ?
										(product?.unit_product === 'грам' ||	product?.unit_product === 'мілілітр') ? `100 ${product?.unit_product}` : `1 ${product?.unit_product}`
										:
										'шт'
								}
							</span >
							{
								showCount
									?
									<CardCountForButton
										item={product}
										countPlus={countPlus}
										countMinus={countMinus}
										countValue={countValue}
										alertForAddProductInBasket={alertForAddProductInBasket}
										addStatus={addStatus}
										removeProductFromBasket={removeProductFromBasket}
									/>
									:
									<button
										className='cardForProduct-card_header-button'
										onClick={counterFunctionalAddBasket}
									>
								До кошика
							</button >
							}
						</div >
					</>
			}
		</div >
	)
}

export default CardForProduct