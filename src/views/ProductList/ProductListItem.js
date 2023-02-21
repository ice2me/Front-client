import React, {
	useEffect,
	useState
} from 'react'
import productImg from "../../assets/images/NoPhoto.png"
import deleteCardIcon from "../../assets/icons/delete.svg"
import basketAdd from "../../assets/icons/backetAdded.svg"
import basketNotAdd from "../../assets/icons/backet.svg"
import {
	Button,
	Form
} from "react-bootstrap"
import {
	FormattedMessage,
	useIntl
} from "react-intl";
import close from '../../assets/icons/exit.svg'

const defaultCheckedCard = {
	count: 0,
	total_price: null,
	added_basket: false
}

const ProductListItem = ({
	item,
	basket,
	addCheckedCard,
	deleteCard,
	variantTrading,
	setIsEditHandler,
	calculateTotalCost
}) => {
	const [counterValue, setCounterValue] = useState(basket ? item.count : 1)
	const [totalPrice, setTotalPrice] = useState(basket ? item.total_price : null)
	const [activeIconAddBasketCard, setActiveIconAddBasketCard] = useState(false)
	const [valueCard, setValueCard] = useState(basket ? item : defaultCheckedCard)
	const [showDescription, setShowDescription] = useState(false)
	const [otherOptions, setOtherOptions] = useState(false)
	const [isEditWatcher, setIsEditWatcher] = useState(false)
	const [otherUnitProduct, setOtherUnitProduct] = useState(item.unit_product
		|| null)
	const {formatMessage} = useIntl()

	useEffect(() => {
		setValueCard({
			count: counterValue || item.price_product,
			total_price: totalPrice || item.price_product,
			unit_product: otherUnitProduct
		})
		basket && setIsEditHandler(isEditWatcher)
	}, [counterValue, totalPrice, isEditWatcher, otherUnitProduct])
	const buyHandler = () => {
		const tehCard = {
			...item, ...valueCard,
			added_basket: true
		}
		addCheckedCard(tehCard)
		setActiveIconAddBasketCard(true)
		basket && setIsEditWatcher(false)
	}

	const calculationTotalPrice = () => {
		if (otherUnitProduct === formatMessage({id: 'gram' || 'milliliter'})) {
			return setTotalPrice(parseInt(((item.price_product / 1000) * counterValue).toFixed(2)))
		}
	}

	useEffect(() => {
		calculationTotalPrice()
	}, [counterValue, otherUnitProduct])

	const counterPlus = () => {
		if (counterValue >= 1) {
			setCounterValue(parseInt(counterValue + 1))
			setTotalPrice((parseInt(counterValue + 1) * item?.price_product))
			basket && setIsEditWatcher(true)
		}
	}
	const counterMinus = () => {
		if (counterValue >= 2) {
			setCounterValue(parseInt(counterValue - 1))
			setTotalPrice((totalPrice - item?.price_product))
			basket && setIsEditWatcher(true)
		}
	}

	const valueInputNumber = (value) => {
		if (value >= 1) {
			setCounterValue(parseInt(value))
			setTotalPrice((parseInt(value) * item?.price_product))
			basket && setIsEditWatcher(true)
		} else {
			setCounterValue(1)
			basket && setIsEditWatcher(true)
		}
	}

	const deleteCardItem = (id) => {
		setActiveIconAddBasketCard(false)
		deleteCard(id)
	}

	return (
		<li
			key={item?._id}
			className={`home-body_item ${!item.available_product ? 'd-none' : ''}`}
		>
			<img
				src={item?.image_product ? item?.image_product : productImg}
				alt="photo product"
			/>
			<h3>{item?.name_product}</h3>
			<span className='text-center'>
				<FormattedMessage id='price' />
				<span className='home-body_item-price'>
				<b>{item?.price_product} {item?.currency_product}</b>
			</span>
			</span>
			{
				item?.description_product
					?
					<div
						className='home-body_item-description'
						onClick={() => setShowDescription(true)}
					>
						<span>{item?.description_product} </span>
						<div style={{zIndex: showDescription ? '999' : '-1'}}>
							<button
								onClick={(e) => {
									e.stopPropagation()
									setShowDescription(false)
								}}
							>
								<img
									src={close}
									alt="close"
								/>
							</button>
							{item?.description_product ? item?.description_product : ''}
							<button
								onClick={(e) => {
									e.stopPropagation()
									setShowDescription(false)
								}}
							>
								<img
									src={close}
									alt="close"
								/>
							</button>
						</div>
					</div>
					:
					<div className='category-body_item-description'></div>
			}
			{
				!otherOptions
				&&
				<div className='home-body_counter'>
					<button
						onClick={() => {
							counterMinus()
						}}
						disabled={counterValue === 1}
					>
						-
					</button>
					<div className='home-body_counter-number'>
						<input
							type="number"
							min="1"
							max="9999"
							value={counterValue}
							onChange={(e) => {
								valueInputNumber(e.target.value)
							}}
						/>
						<b>
							{`
								
					${item?.unit_product}
				`}
						</b>
					</div>
					<button
						onClick={() => {
							counterPlus()
						}}
						disabled={counterValue === 9999}
					>
						+
					</button>
				</div>
			}
			<div className='productList-item_otherOptions'>
				<button
					onClick={(e) => {
						e.stopPropagation()
						setOtherOptions(!otherOptions)
					}}
				>
					Інші варіанти ваги
				</button>
				{otherOptions
					&&
					<div className="productList-item_otherOptions-wrapper">
						<Form.Group className="productList-item_otherOptions-select">
							<Form.Select
								onChange={(e) => setOtherUnitProduct(e.target.value)}
								aria-label="Units product"
								name='unit_product'
								defaultChecked={otherUnitProduct}
								defaultValue={otherUnitProduct}
							>
								<option
									value={formatMessage({id: 'piece'})}
									defaultChecked
								>
									<FormattedMessage id='piece' />
								</option>
								<option value={formatMessage({id: 'kilogram'})}>
									<FormattedMessage id='kilogram' />
								</option>
								<option value={formatMessage({id: 'gram'})}>
									<FormattedMessage id='gram' />
								</option>
								<option value={formatMessage({id: 'liter'})}>
									<FormattedMessage id='liter' />
								</option>
								<option value={formatMessage({id: 'milliliter'})}>
									<FormattedMessage id='milliliter' />
								</option>
							</Form.Select>
						</Form.Group>
						<div className='home-body_counter'>
							<button
								onClick={() => {
									counterMinus()
								}}
								disabled={counterValue === 1}
							>
								-
							</button>
							<div className='home-body_counter-number'>
								<input
									type="number"
									min="1"
									max="9999"
									value={counterValue}
									onChange={(e) => {
										valueInputNumber(e.target.value)
									}}
								/>
							</div>
							<button
								onClick={() => {
									counterPlus()
								}}
								disabled={counterValue === 9999}
							>
								+
							</button>
						</div>
					</div>
				}


			</div>
			{
				calculateTotalCost && <span>
				<FormattedMessage id='totalPrice' />
				<b>{totalPrice || item?.price_product} {item?.currency_product}</b>
			</span>
			}
			{variantTrading === 'Shop' &&
				!basket && <div
					className='home-body_addProduct-checked'
				>
					<div className='home-body_addProduct-checked_inp'>
						{
							basket
								?
								<img
									src={item?.added_basket ? basketAdd : basketNotAdd}
									alt="basket"
								/>
								:
								<img
									src={activeIconAddBasketCard ? basketAdd : basketNotAdd}
									alt="basket"
								/>
						}
					</div>
				</div>
			}
			{
				variantTrading === 'Shop' &&
				<Button
					className='home-body_addProduct-buy'
					variant="primary"
					onClick={buyHandler}
					disabled={!item.available_product || basket && !isEditWatcher}
				>
					{basket ? <FormattedMessage id='editCard' /> : <FormattedMessage id='buy' />}
				</Button>
			}
			{
				basket && <button
					className="home-body_addProduct home-body_addProduct-delete"
					onClick={() => deleteCardItem(item?._id)}
				>
					<img
						src={deleteCardIcon}
						alt="delete"
						title='Delete Product Card'
					/>
				</button>
			}
		</li>
	);
};

export default ProductListItem;