/* eslint-disable */
import { useSelector } from "react-redux"
import React, {
	useEffect,
	useState
} from "react"
import ProductList from "../ProductList/ProductList"
import {
	useGetItemListMutation,
	useSearchProductMutation,
	useSearchTagMutation
} from "../../redux/services/categoriesApi"
import Loader from "../../components/Loader/Loader"
import {
	FormattedMessage,
	useIntl
} from "react-intl";
import squareView from '../../assets/icons/checkbox-unchecked.svg'
import listView from '../../assets/icons/list.svg'
import noImage from '../../assets/icons/happySocks.svg'
import {
	Button,
	Form,
	InputGroup
} from "react-bootstrap";
import searchIcon from '../../assets/icons/search.svg'
import { Typeahead } from "react-bootstrap-typeahead";


const HomeCategory = ({
	nameShop,
	toggleViewHandler,
	toggleView
}) => {
	const {
		categories,
		shop
	} = useSelector(state => state.categories)
	const [showProductsList, setShowProductsList] = useState(false)
	const [categoryNameChange, setCategoryNameChange] = useState(null)
	const [categoryIdChange, setCategoryIdChange] = useState(null)
	const [searchValueArr, setSearchValueArr] = useState([])
	const [searchValue, setSearchValue] = useState('')
	const [showSearchWindow, setShowSearchWindow] = useState(false)
	const [reqSearchProduct, setReqSearchProduct] = useState([])
	const [optionsSearch, setOptionsSearch] = useState([])
	const [getItemList, {isLoading: isGetItemListLoading}] = useGetItemListMutation()
	const [searchProduct, {isLoading: isSearchProductLoading}] = useSearchProductMutation()
	const [searchTag, {isLoading: isSearchTagLoading}] = useSearchTagMutation()
	const categoriesList = categories || []
	const {formatMessage} = useIntl()

	const showList = () => setShowProductsList(true)
	const hideList = () => setShowProductsList(false)

	const toggleSearchWindow = () => setShowSearchWindow(!showSearchWindow)

	useEffect(() => {
		if (showProductsList) {
			async function getProductsList() {
				try {
					await getItemList({
						id: categoryIdChange,
						link: nameShop
					})
				} catch (e) {
					console.log(e)
				}
			}

			getProductsList()
		}
	}, [showProductsList])

	const searchHandler = async () => {
		const data = await searchProduct({
			id: shop._id,
			product_name: searchValue
		})
		setReqSearchProduct(data?.data)
		setSearchValueArr([])
		toggleSearchWindow()
	}
	const searchTagOptions = async () => {
		const data = await searchTag({
			id: shop._id
		})
		setOptionsSearch(data?.data)
	}

	useEffect(() => {
		searchTagOptions().then()
	}, [shop])


	useEffect(() => {
		setSearchValue(searchValueArr.length >= 1 ? searchValueArr?.slice(0, 1).shift() : '')
	}, [searchValueArr])

	if (showProductsList) {
		return isGetItemListLoading ? <Loader /> : <ProductList
			hideList={hideList}
			categoryNameChange={categoryNameChange}
			searchReq={null}
		/>
	} else if (showSearchWindow) {
		return isSearchProductLoading ? <Loader /> : <ProductList
			hideList={toggleSearchWindow}
			categoryNameChange={formatMessage({id: 'search'})}
			searchReq={reqSearchProduct}
		/>
	}

	return (
		<>
			<div className='home-header'>
				<h1 className="home-title">
					<FormattedMessage id="categoryList" />
				</h1>
				<Form className='home-header_wrapper'>
					<img
						src={searchIcon}
						alt=""
					/>
					<Form.Group>
						<Typeahead
							id="basic-typeahead-single"
							labelKey="searchProduct"
							onChange={setSearchValueArr}
							options={optionsSearch}
							placeholder={formatMessage({id: 'nameProduct'})}
							selected={searchValueArr}
						/>
					</Form.Group>
					<Button
						onClick={searchHandler}
						disabled={searchValueArr.length < 1}
					>
						{isSearchTagLoading
							?
							'Loading'
							:
							<FormattedMessage id='search' />
						}</Button>
				</Form>

			</div>
			{
				categoriesList.length < 1
				&&
				<h1 className="productList-arrowDown">
					<FormattedMessage id='thisStoreHasNotAddedProductYet' />
				</h1>
			}
			<div
				className='home-body_accordingHeader'
			>
				<div
					className={`home-body_accordingHeader-wrapper ${toggleView ? 'category-body_wrapper-listView' : ''}
				`}
				>
					{
						categoriesList?.map((category, index) => (
							<div
								className={`home-body_accordingHeader-item ${toggleView ? 'category-body_accordingHeader-listView' : ''}
								`}
								key={category?._id}
								onClick={() => {
									setCategoryIdChange(category?._id)
									setCategoryNameChange(category?.category_name)
									showList()
								}}
								style={{
									backgroundImage: `${toggleView
										?
										''
										:
										`url(${
											category?.category_image
												?
												category?.category_image
												:
												noImage
										})`}`
								}}
							>
								{
									toggleView
									&&
									<img
										src={category?.category_image ? category?.category_image : noImage}
										alt='no Image'
									/>
								}
								<p
									data-category={category?.category_name}
								>
									<b>
										{category?.category_name}
									</b>
								</p>
							</div>
						))
					}
				</div>
				<div className='category-body_wrapper-view'>
					<button
						className="category-body_wrapper-view_button"
						onClick={toggleViewHandler}
					>
						{
							toggleView
								?
								<img
									src={squareView}
									alt="List View"
								/>
								:
								<img
									src={listView}
									alt="Square View"
								/>
						}


					</button>
				</div>
			</div>
		</>
	)
}

export default HomeCategory
