/* eslint-disable */
import close from "../../assets/icons/exit.svg"
import { Button } from "react-bootstrap"
import ProductListItem from "../ProductList/ProductListItem"
import basket from '../../assets/icons/backetAdded.svg'
import {
	deleteCardToBasket,
	pushCardToBasket
} from "../../redux/slices/categoriesSlice"
import {
	useDispatch,
	useSelector
} from "react-redux"
import React, {
	useMemo,
	useState
} from "react"
import ModalFormToOrder from "../../components/Modal/ModalFormToOrder"
import { FormattedMessage } from "react-intl";

const Basket = ({
	toggleBasket,
	items
}) => {
	const [showFormToOrder, setShowFormToOrder] = useState(false)
	const {shop} = useSelector(state => state.categories)
	const [isEditHandler, setIsEditHandler] = useState(false)
	const dispatch = useDispatch()
	const variantTrading = shop?.variant_trading
	const calculateTotalCost = shop?.calculate_total_cost

	const memoTotalPrices = useMemo(() => {
		return items
			.map(item => item.total_price)
			.reduce((prevValue, curValue) => prevValue + curValue, 0)
	}, [items])
	const handleCloseFormToOrder = () => {
		toggleBasket()
		setShowFormToOrder(false)
	}
	const handleShowFormToOrder = () => setShowFormToOrder(true)

	const addCheckedCard = (card) => {
		dispatch(pushCardToBasket(card))
	}
	const deleteCard = (id) => {
		dispatch((deleteCardToBasket(id)))
	}

	return (
		<>
			<ModalFormToOrder
				show={showFormToOrder}
				onHide={handleCloseFormToOrder}
				items={items}
			/>
			<div className='profile'>
				<h1 className="productList-title">
					<FormattedMessage id='myBasket' />
					<button
						className='productList-button'
						onClick={toggleBasket}
					>
						<img
							src={close}
							alt="close"
						/>
					</button>
				</h1>
				<div className="basket">
					{
						items.length < 1
							?
							<div className='productList-arrowDown'>
								<h2>
									<FormattedMessage id='myBasketFree' />
								</h2>
								<img
									src={basket}
									alt="basket"
								/>
							</div>
							:
							<ul className="basket-body">
								{
									items?.map(item => (
										<ProductListItem
											key={item?._id}
											item={item}
											basket
											addCheckedCard={addCheckedCard}
											deleteCard={deleteCard}
											variantTrading={variantTrading}
											setIsEditHandler={setIsEditHandler}
										/>
									))
								}
							</ul>
					}
					{
						calculateTotalCost && (
							items.length >= 1 &&
							<p className='basket-body_total'>
								<FormattedMessage id='myBasketTotalAmount' />
								{memoTotalPrices}₴
							</p>
						)
					}
				</div>
				<div className='basket-order'>
					<Button
						variant="primary"
						size="lg"
						onClick={handleShowFormToOrder}
						disabled={items?.length === 0 || isEditHandler}
					>
						<span>
							<FormattedMessage id='toOrder' />
							(
							{items.length}
							<FormattedMessage id='piece' />
							)
						</span>
					</Button>
				</div>

			</div>
			<div
				onClick={handleCloseFormToOrder}
				className="profile-shadow"
			></div>
		</>
	)
}

export default Basket