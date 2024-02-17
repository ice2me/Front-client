import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import Basket from "../../components/Basket/Basket"
import SearchProduct from "../../components/SearchProduct/SearchProduct"
import WrapperModal from "../../components/WrapperModal/WrapperModal"
import { useGetItemListMutation } from "../../redux/services/categoriesApi"
import { pushCardToBasket, toggleSearchWindow } from "../../redux/slices/categoriesSlice"
import { rootingHelpers } from "../../utils/helperFunctions/rootingHelpers"
import Categories from "../Categories/Categories"
import Products from "../Products/Products"
import Profile from "../Profile/Profile"

const Home = () => {
	const {shop, categories, items, basketWindow, searchWindow, selectedRoot} = useSelector((state) => state.categories)
	const [getItemList, {isLoading: isGetItemListLoading}] = useGetItemListMutation()
	const [toggleView, setToggleView] = useState(false)
	const [openCategory, setOpenCategory] = useState(false)
	const [changeCategoryName, setChangeCategoryName] = useState(null)
	const dispatch = useDispatch()

	// console.log(shop)
	const openCategoryHandler = async (value, id, categoryName) => {
		if (value === true) {
			const {error} = await getItemList({
				id: id,
				link: shop?.shop_name
			})
		}
		setOpenCategory(value)
		setChangeCategoryName(categoryName)
	}

	const toggleViewHandler = (value) => {
		setToggleView(value)
		localStorage.setItem('viewItems', JSON.stringify({'view': value}))
	}

	useEffect(() => {
		const res = JSON?.parse(localStorage?.getItem('viewItems'))?.view
		const items = JSON.parse(localStorage.getItem('items'))
		if (items?.length > 0) {
			items?.forEach(it => dispatch(pushCardToBasket(it)))
		}
		setToggleView(res)
	}, [])

	const closeSearchWindow = () => rootingHelpers('home', dispatch)

	return (
		<div className='home'>
			<div className='home-wrapper'>
				{
					selectedRoot === 'basket'
					&&
					<Basket />
				}
				{
					selectedRoot === 'search'
					&&
					<WrapperModal hide={closeSearchWindow} title={'Закрити пошук'}>
						<SearchProduct
							toggleView={toggleView}
						/>
					</WrapperModal>
				}
				{
					selectedRoot === 'profile'
					&&
					<Profile />
				}
				{
					openCategory && selectedRoot === 'home'
						?
						<Products
							products={items}
							toggleView={toggleView}
							categoryName={changeCategoryName}
							toggleViewHandler={toggleViewHandler}
							openCategoryHandler={openCategoryHandler}
						/>
						:
						<Categories
							toggleViewHandler={toggleViewHandler}
							toggleView={toggleView}
							categories={categories}
							shop={shop}
							openCategoryHandler={openCategoryHandler}
						/>
				}
			</div >
		</div >
	)
}

export default Home