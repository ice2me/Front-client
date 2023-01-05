import close from "../../assets/icons/exit.svg"
import { Button } from "react-bootstrap"
import ProductListItem from "../ProductList/ProductListItem"
import basket from '../../assets/icons/backetAdded.svg'
import {
	deleteCardToBasket,
	pushCardToBasket
} from "../../redux/slices/categoriesSlice"
import { useDispatch } from "react-redux"
import {
	useMemo,
	useState
} from "react"
import ModalFormToOrder from "../../components/Modal/ModalFormToOrder"

const Basket = ({
	toggleBasket,
	items
}) => {
	const [showFormToOrder, setShowFormToOrder] = useState(false)
	const dispatch = useDispatch()

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
					My Basket
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
								<h2>You have not selected any product...</h2>
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
										/>
									))
								}
							</ul>
					}
					<p className='basket-body_total'>Total Amount: {memoTotalPrices}</p>
				</div>
				<div className='basket-order'>
					<Button
						variant="primary"
						size="lg"
						onClick={handleShowFormToOrder}
						disabled={items?.length === 0}
					>
						<span>To Order ({items.length} piece)</span>
					</Button>
				</div>

			</div>
		</>
	)
}

export default Basket