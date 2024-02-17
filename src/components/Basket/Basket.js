import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import DefaultPhoto from "../../assets/images/default-no-photo.png"
import { deleteCardToBasket, pushCardToBasket, toggleBasketWindow } from "../../redux/slices/categoriesSlice"
import { rootingHelpers } from "../../utils/helperFunctions/rootingHelpers"
import FormOrder from "../FormOrder/FormOrder"
import WrapperModal from "../WrapperModal/WrapperModal"

const Basket = () => {
	const {shop, basket} = useSelector((state) => state.categories)
	const [openModalForOrder, setOpenModalForOrder] = useState(false)
	const dispatch = useDispatch()

	const countPlus = id => {
		const tehObj = basket?.find(item => item?._id === id)
		dispatch(pushCardToBasket({
			...tehObj,
			count: tehObj?.count + 1,
			total_price: tehObj?.total_price + tehObj?.price_product
		}))
	}

	const countMinus = id => {
		const tehObj = basket?.find(item => item?._id === id)
		if (tehObj?.count > 1) {
			dispatch(pushCardToBasket({
				...tehObj,
				count: tehObj?.count - 1,
				total_price: tehObj?.total_price - tehObj?.price_product
			}))
		}
	}

	const removeProductFromBasket = id => {
		dispatch(deleteCardToBasket(id))
	}

	const memoTotalPriceRes = useMemo(() => {
		let res = 0
		const currency = 'грн'

		basket?.map(item => {
			res = res + item?.total_price
		})
		return `${res} ${currency}`
	}, [basket])

	const showModalOrder = () => {
		// console.log(basket)
		setOpenModalForOrder(true)
	}
	const closeModalOrder = () => {
		// console.log(basket)
		setOpenModalForOrder(false)
	}

	const closeBasketWindow = () => rootingHelpers('home', dispatch)
	// console.log(basket)
	return (
		<WrapperModal
			hide={closeBasketWindow}
			title={'Продовжити покупки'}
		>
			{
				openModalForOrder
				&&
				<FormOrder
					show={openModalForOrder}
					onHide={closeModalOrder}
					items={basket}
				/>
			}
			<div className='basket-wrapper_content'>
				<h2 className='basket-wrapper_content-title'>
					Кошик
				</h2 >
				{
					basket?.length === 0
					&&
					<>
						<h2 className='basket-wrapper_content-title'>
							Кошик порожній
						</h2 >
						<h3>
							Але це ніколи не пізно виправити =P
						</h3>
					</>
				}
				<ul className='basket-wrapper_content-list'>
					{
						basket && basket?.map(item => (
							<li
								className='basket-wrapper_content-list_item'
								key={item?._id}
							>
								<div
									className='basket-wrapper_content-list_item-photo'
									style={
										item?.image_product
											?
											{backgroundImage: `url(${item?.image_product})`}
											:
											{backgroundImage: `url(${DefaultPhoto})`}
									}
								></div >
								<div className='basket-wrapper_content-list_item-block'>
									<div className='basket-wrapper_content-list_item-content'>
										<h3 className='basket-wrapper_content-list_item-content_name'>{item?.name_product}</h3 >
										<p className='basket-wrapper_content-list_item-content_price'>{`${item?.price_product} ${item?.currency_product}/${item?.unit_product}`}</p >
									</div >
									<div className='basket-wrapper_content-list_item-counter'>
										<button
											className='basket-wrapper_content-list_item-counter_minus'
											onClick={() => countMinus(item?._id)}
										>-</button >
										<p className='basket-wrapper_content-list_item-counter_num'>{item?.count}</p >
										<button
											className='basket-wrapper_content-list_item-counter_plus'
											onClick={() => countPlus(item?._id)}
										>+</button >
									</div >
									<div className='basket-wrapper_content-list_item-price'>
										{`${item?.total_price} ${item?.currency_product}`}
									</div >
									<button
										className='basket-wrapper_content-list_item-remove'
										onClick={() => removeProductFromBasket(item?._id)}
									></button >
								</div >
							</li >
						))
					}
				</ul >
				<div className='basket-wrapper_content-footer'>
					{shop?.total_price !== undefined ?
						<p className='basket-wrapperMob_content-footer_res'>
							`Разом: ${memoTotalPriceRes}`
						</p >
						:
						''
					}
					{
						basket?.length > 0
						&&
						<button
							className='basket-wrapperMob_content-footer_make'
							onClick={showModalOrder}
						>
							Оформити покупку
						</button >
					}
				</div >
			</div >

			<div className='basket-wrapperMob_content'>
				<h2 className='basket-wrapperMob_content-title'>
					Кошик
				</h2 >
				{
					basket?.length === 0
					&&
					<>
						<h2 className='basket-wrapper_content-title'>
							Кошик порожній
						</h2 >
						<h3>
							Але це ніколи не пізно виправити =P
						</h3>
					</>
				}
				<ul className='basket-wrapperMob_content-list'>
					{
						basket && basket?.map(item => (
							<li
								className='basket-wrapperMob_content-list_item'
								key={item?._id}
							>
								<div className='basket-wrapperMob_content-list_item-block'>
									<div
										className='basket-wrapperMob_content-list_item-photo'
										style={
											item?.image_product
												?
												{backgroundImage: `url(${item?.image_product})`}
												:
												{backgroundImage: `url(${DefaultPhoto})`}
										}
									></div >
									<div className='basket-wrapperMob_content-list_item-content'>
										<h3 className='basket-wrapperMob_content-list_item-content_name'>{item?.name_product}</h3 >
										<p className='basket-wrapperMob_content-list_item-content_price'>{`${item?.price_product} ${item?.currency_product}/${item?.unit_product}`}</p >
									</div >
								</div >
								<div className='basket-wrapperMob_content-list_item-counter'>
									<button
										className='basket-wrapperMob_content-list_item-counter_minus'
										onClick={() => countMinus(item?._id)}
									>-</button >
									<p className='basket-wrapperMob_content-list_item-counter_num'>{item?.count}</p >
									<button
										className='basket-wrapperMob_content-list_item-counter_plus'
										onClick={() => countPlus(item?._id)}
									>+</button >
									<div className='basket-wrapperMob_content-list_item-price'>
										{`${item?.total_price} ${item?.currency_product}`}
									</div >
								</div >
								<button
									className='basket-wrapperMob_content-list_item-remove'
									onClick={() => removeProductFromBasket(item?._id)}
								>
									Видалити
								</button >
							</li >
						))
					}
				</ul >
				<div className='basket-wrapperMob_content-footer'>
					{shop?.total_price !== undefined ?
						<p className='basket-wrapperMob_content-footer_res'>
							`Разом: ${memoTotalPriceRes}`
						</p >
						:
						''
					}
					{
						basket?.length > 0
						&&
						<button
							className='basket-wrapperMob_content-footer_make'
							onClick={showModalOrder}
						>
							Оформити покупку
						</button >
					}

				</div >
			</div >
		</WrapperModal >
	)
}

export default Basket