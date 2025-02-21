import React, { useEffect, useRef, useState } from 'react'
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
	const [changeSorting, setChangeSorting] = useState(0)
	const [sortProduct, setSortProduct] = useState([])
	const forBodyScrolling = useRef()

	const showProductInfoHandler = (value) => {
		setChangeProduct(value)
		setShowModalForAddProductInBasket(true)
		forBodyScrolling?.current?.scrollIntoView()

	}
	const hideProductInfoHandler = () => {
		setShowModalForAddProductInBasket(false)
	}

	useEffect(() => {
		if (changeSorting === 0) {
			setSortProduct(products)
		}
		if (changeSorting === 1) {
			let res = [...products]?.sort((a,b) => a?.price_product > b?.price_product ? 1 : -1)
			setSortProduct(res)
		}
		if (changeSorting === 2) {
			let res = [...products]?.sort((a,b) => a?.price_product < b?.price_product ? 1 : -1)
			setSortProduct(res)
		}
	}, [changeSorting])

	return (
		<div
			className='cardForProduct-content'
			ref={forBodyScrolling}
		>
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
									onChange={e => setChangeSorting(Number(e.target.value))}
								>
									<option value={0}>Популярні</option >
									<option value={1}>Дешеві</option >
									<option value={2}>Дорогі</option >
								</select >
							</div >
						</div >
					</div >
				</div >
				<div className='cardForProduct-body_wrapper'>
					{
						sortProduct && sortProduct?.map(product => (
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