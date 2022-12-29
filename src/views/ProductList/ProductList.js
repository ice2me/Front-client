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
	categoryNameChange
}) => {
	const {items} = useSelector(state => state.categories)
	const dispatch = useDispatch()

	const memoItems = useMemo(() => {
		return items
	}, [items])

	const addCheckedCard = (card) => {
		dispatch(pushCardToBasket(card))
	}


	return (
		<div className='home productList'>
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
					<h2>There are no products in this category...</h2>
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
							/>
						))
						}
					</ul>
				</div>}
		</div>)
}

export default ProductList