import React, { useEffect, useState } from 'react'
import CardForProduct from "../../components/Card/CardForProduct"
import ProductInfo from "../../components/Card/ProductInfo"
import ToggleView from "../../components/ToggleView/ToggleView"

const Products = ({
	products,
	toggleViewHandler,
	toggleView,
	categoryName,
	shop,
	openCategoryHandler
}) => {
	const [showModalForAddProductInBasket, setShowModalForAddProductInBasket] = useState(false)
	const [changeProduct, setChangeProduct] = useState({})
	const doc = document.getElementById('root')

	const showProductInfoHandler = (value) => {
		setChangeProduct(value)
		setShowModalForAddProductInBasket(true)
	}
	const hideProductInfoHandler = () => {
		setShowModalForAddProductInBasket(false)
	}

	// useEffect(() => {
	// 	if (showModalForAddProductInBasket){
	// 		doc.style.height = 'max-content'
	// 	}else {
	// 		doc.style.height = '100%'
	// 	}
	// }, [showModalForAddProductInBasket])

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
				<div className='cardForProduct-header'>
					<div className='cardForProduct-header_title'>
						<div className='cardForProduct-header_title-top'>
							<button
								className='cardForProduct-header_title-top_button'
								onClick={() => openCategoryHandler(false)}
							>
								Назад до категорiй
							</button >
						</div >
						<div className='cardForProduct-header_title-bottom'>
							<h2 className='cardForProduct-header_title-bottom_name'>
								{categoryName}
							</h2 >
							<div className='cardForProduct-header_title-bottom_block'>
								<ToggleView
									toggleView={toggleView}
									toggleViewHandler={toggleViewHandler}
								/>
								<select
									className='cardForProduct-header_title-bottom_block-select'
									disabled
								>
									<option >-</option >
									<option >Lorem ipsum dolor.</option >
									<option >Lorem ip</option >
								</select >
							</div >
						</div >
					</div >
				</div >
				<div className='cardForProduct-body_wrapper'>
					{
						products && products?.map(product => (
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

export default Products