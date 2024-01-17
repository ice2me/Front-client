import React, { useState } from 'react'
import { useSelector } from "react-redux"
import CardForProduct from "../Card/CardForProduct"
import ProductInfo from "../Card/ProductInfo"

const SearchProduct = ({toggleView}) => {
	const {search} = useSelector((state) => state.categories)
	const [changeProduct, setChangeProduct] = useState({})
	const [showModalForAddProductInBasket, setShowModalForAddProductInBasket] = useState(false)

	const hideProductInfoHandler = () => {
		setShowModalForAddProductInBasket(false)
	}

	const showProductInfoHandler = (value) => {
		setChangeProduct(value)
		setShowModalForAddProductInBasket(true)
	}

	return (
		<div className='cardForProduct-content'>
			<div className='cardForProduct-body'>
				{
					showModalForAddProductInBasket
					&&
					<ProductInfo
						hide={hideProductInfoHandler}
						item={changeProduct}
					/>
				}
				<div className='cardForProduct-body_wrapper'>
					{
						search && search?.map(product => (
							<CardForProduct
								key={product?._id}
								product={product}
								view={toggleView}
								showProductInfoHandler={showProductInfoHandler}
							/>
						))
					}
				</div >
			</div >
		</div >
	)
}

export default SearchProduct