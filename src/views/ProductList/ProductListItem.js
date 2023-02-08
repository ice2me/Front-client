/* eslint-disable */
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
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";
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
	variantTrading
}) => {
	const [counterValue, setCounterValue] = useState(basket ? item.count : 1)
	const [totalPrice, setTotalPrice] = useState(basket ? item.total_price : null)
	const [activeIconAddBasketCard, setActiveIconAddBasketCard] = useState(false)
	const [valueCard, setValueCard] = useState(basket ? item : defaultCheckedCard)
	const [showDescription, setShowDescription] = useState(false)

	useEffect(() => {
		setValueCard({
			count: counterValue || item.price_product,
			total_price: totalPrice || item.price_product
		})
	}, [counterValue, totalPrice])
	const buyHandler = () => {
		const tehCard = {
			...item, ...valueCard,
			added_basket: true
		}
		addCheckedCard(tehCard)
		setActiveIconAddBasketCard(true)
		// toast(`add to basket: ${item?.name_product}`)
	}

	const counterPlus = () => {
		if (counterValue >= 1) {
			setCounterValue(parseInt(counterValue + 1))
			setTotalPrice(parseInt(counterValue + 1) * item?.price_product)
		}
	}
	const counterMinus = () => {
		if (counterValue >= 2) {
			setCounterValue(parseInt(counterValue - 1))
			setTotalPrice(totalPrice - item?.price_product)
		}
	}

	const valueInputNumber = (value) => {
		if (value >= 1) {
			setCounterValue(parseInt(value))
			setTotalPrice(parseInt(value) * item?.price_product)
		} else {
			setCounterValue(1)
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
				${item?.unit_product === 'gram'
						||
						item?.unit_product === 'грам'
						||
						item?.unit_product === 'milliliter'
						||
						item?.unit_product === 'мілілітр'
							? '00'
							: ''}
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
			{/*<span>*/}
			{/*	<b>*/}
			{/*		{`*/}
			{/*	${counterValue}${item?.unit_product === 'gram'*/}
			{/*		||*/}
			{/*		item?.unit_product === 'грам'*/}
			{/*		||*/}
			{/*		item?.unit_product === 'milliliter'*/}
			{/*		||*/}
			{/*		item?.unit_product === 'мілілітр'*/}
			{/*			? '00'*/}
			{/*			: ''}*/}
			{/*		${item?.unit_product}*/}
			{/*	`}*/}
			{/*	</b>*/}
			{/*</span>*/}
			<span>
				<FormattedMessage id='totalPrice' />
				<b>{totalPrice || item?.price_product} {item?.currency_product}</b>
			</span>
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
					disabled={!item.available_product}
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