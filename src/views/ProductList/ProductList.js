/* eslint-disable */
import React, {
	useCallback,
	useEffect,
	useMemo,
	useState
} from 'react'
import close from '../../assets/icons/exit.svg'
import {
	useDispatch,
	useSelector
} from "react-redux"
import arrowDown from "../../assets/icons/arrowDown.svg"
import ProductListItem from "./ProductListItem";
import { pushCardToBasket } from "../../redux/slices/categoriesSlice";
import basket from "../../assets/icons/backetAdded.svg";
import { FormattedMessage } from "react-intl";

const initialState = {
	image_product: '',
	name_product: '',
	description_product: '',
	unit_product: '',
	price_product: '',
	currency_product: '',
	available_product: true
}

const ProductList = ({
	hideList,
	categoryNameChange,
	searchReq
}) => {
	const {items, shop} = useSelector(state => state.categories)
	const dispatch = useDispatch()
	const variantTrading = shop?.variant_trading
	const calculateTotalCost = shop?.calculate_total_cost

	const memoItems = useMemo(() => {
		return searchReq? searchReq : items
	}, [items])

	const addCheckedCard = (card) => {
		dispatch(pushCardToBasket(card))
	}

	return (
		<div className='productList'>
			<h1 className="productList-title">
				{categoryNameChange}
				<button
					className='productList-button'
					onClick={hideList}
				>
					<img
						src={close}
						alt="close"
					/>
				</button>
			</h1>
			{memoItems?.length < 1
				?
				<div className='productList-arrowDown'>
					<h2>
						<FormattedMessage id='thereAreNoProductsInThisCategory' />
					</h2>
					<img
						src={basket}
						alt="basket"
					/>
				</div>
				:
				<div className='productList-wrapper'>
					<ul>
						{
							memoItems?.map(item => (
							<ProductListItem
								key={item?._id}
								item={item}
								addCheckedCard={addCheckedCard}
								variantTrading={variantTrading}
								calculateTotalCost={calculateTotalCost}
							/>
						))
						}
					</ul>
				</div>}
		</div>)
}

export default ProductList