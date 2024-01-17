import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import Logo from '../../assets/icons/logo-header-icon.svg'
import Backet from '../../assets/icons/backet-icon.svg'
import ShopLogo from '../../assets/images/default-shop-logo.png'
import Phone from '../../assets/icons/phone-icon.svg'
import Search from '../../assets/icons/search-icon.svg'
import { toggleBasketWindow, toggleSearchWindow } from "../../redux/slices/categoriesSlice"
import { addSpace } from "../../utils/toggleSpaceString"
import { LINK_FOR_LOGO } from "../../utils/constants"
import { Loader, Typeahead } from "react-bootstrap-typeahead"
import { useIntl } from "react-intl"
import {
	useGetCategoriesMutation,
	useSearchProductMutation,
	useSearchTagMutation
} from "../../redux/services/categoriesApi"
import { useLocation, useNavigate } from "react-router-dom"

const Header = () => {
	const {shop, basket, searchWindow} = useSelector((state) => state.categories)
	const [searchProduct, {isLoading: isSearchProductLoading}] = useSearchProductMutation()
	const [getCategories, {isLoading: isGetCategoriesLoader}] = useGetCategoriesMutation()
	const [searchTag, {isLoading: isSearchTagLoading}] = useSearchTagMutation()
	const [searchValueArr, setSearchValueArr] = useState([])
	const [openSearchBlock, setOpenSearchBlock] = useState(false)
	const [optionsSearch, setOptionsSearch] = useState([])
	const navigate = useNavigate()
	const location = useLocation()
	const urlSplit = location.pathname.split("/")
	const nameShop = urlSplit[urlSplit.length - 1]
	const dispatch = useDispatch()
	const {formatMessage} = useIntl()

	const getAllProductsShopList = useCallback(async () => {
		try {
			const data = await getCategories(nameShop)
			if (data?.data?.shop?.paid_subscription === false) {
			}
			if (data?.error) {
				navigate('/')
			}

			if (searchValueArr?.length === 0) {
				const dataItemsList = await searchTag({
					id: data?.data?.shop._id
				})
				setOptionsSearch(dataItemsList?.data)
			} else {
				const dataItemsList = await searchProduct({
					id: data?.data?.shop._id,
					product_name: searchValueArr[0]
				})
				setOptionsSearch(dataItemsList?.data)
				dispatch(toggleSearchWindow(true))
			}
		} catch (e) {
			console.log(e)
		}
	}, [searchValueArr])

	useEffect(() => {
		getAllProductsShopList()
	}, [searchValueArr])

	const toggleSearchBlock = () => setOpenSearchBlock(!openSearchBlock)
	const openBasketWindow = () => {
		dispatch(toggleBasketWindow(true))
		dispatch(toggleSearchWindow(false))
	}

	useEffect(() => {
		searchWindow === false && setSearchValueArr([])
	}, [searchWindow])

	return (
		<div className='header'>
			<div className='header-desktop'>
				<div className='header-logo'>
					<a
						href={LINK_FOR_LOGO}
						className='header-logo_link'
					>
						<img
							className='header-logo_image'
							src={Logo}
							alt='logo Theke'
						/>
					</a >
				</div >
				<div className='header-search'>
					<div className='header-search_wrapper'>
						<Typeahead
							id='basic-typeahead-single'
							labelKey='searchProduct'
							onChange={setSearchValueArr}
							options={optionsSearch}
							placeholder={formatMessage({id: 'search'})}
							selected={searchValueArr}
						/>
						<img
							className='header-search_wrapper-icon'
							src={Search}
							alt='backet'
						/>
					</div >

				</div >
				<button className='header-backet' onClick={openBasketWindow}>
					<img
						className='header-backet_icon'
						src={Backet}
						alt='backet'
					/>
					<p className='header-backet_count'>
						{
							basket?.length >= 1
								?
								basket?.length
								:
								0
						}
					</p >
				</button >
				<div className='header-shopInfo'>
					<div
						className='header-shopInfo_logo'
						style={
							shop?.image_logo
								?
								{backgroundImage: `url(${shop?.image_logo})`}
								:
								{backgroundImage: `url(${ShopLogo})`}
						}
					>
					</div >
					<div className='header-shopInfo-wrapper'>
						<div className='header-shopInfo_shopName'>
							{shop?.shop_name ? addSpace(shop?.shop_name) : 'Shop Name'}
						</div >
						<div className='header-shopInfo_phoneNumber'>
							<img
								src={Phone ? Phone : "/"}
								alt='phone icon'
							/>
							<a href={`tel:${shop?.phone ? shop?.phone : '/'}`}> +{shop?.phone ? shop?.phone : '380660000000'}</a >
						</div >
					</div >
				</div >
			</div >

			<div className='header-mobile'>
				<div className='header-mobile_logo'>
					<a
						href={LINK_FOR_LOGO}
						className='header-mobile_logo-link'
					>
						<img
							className='header-mobile_logo-image'
							src={Logo}
							alt='logo Theke'
						/>
					</a >
				</div >
				<div className='header-mobile_shopInfo'>
					<div
						className='header-mobile_shopInfo-logo'
						style={
							shop?.image_logo
								?
								{backgroundImage: `url(${shop?.image_logo})`}
								:
								{backgroundImage: `url(${ShopLogo})`}
						}
					>
					</div >
					<div className='header-mobile_shopInfo-wrapper'>
						<div className='header-mobile_shopInfo-shopName'>
							{shop?.shop_name ? addSpace(shop?.shop_name) : 'Shop Name'}
						</div >
					</div >
				</div >
				<div className='header-mobile_block'>
					<button
						className={`header-mobile_search ${openSearchBlock ? 'active-button-search' : ''}`}
						onClick={toggleSearchBlock}
					>
					<img
						src={Search}
						alt='search'
					/>
				</button >
					{
						openSearchBlock
						&&
						<div className={`header-mobile_search-block ${openSearchBlock ? 'open-search' : 'close-search'}`}>
						<Typeahead
							id='basic-typeahead-single'
							labelKey='searchProduct'
							onChange={setSearchValueArr}
							options={optionsSearch}
							placeholder={formatMessage({id: 'search'})}
							selected={searchValueArr}
						/>
					</div >
					}
				</div >
			</div >
		</div >
	)
}

export default Header