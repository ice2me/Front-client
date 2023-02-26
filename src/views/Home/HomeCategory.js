/* eslint-disable */
import { useSelector } from "react-redux"
import React, {
	useEffect,
	useState
} from "react"
import ProductList from "../ProductList/ProductList"
import { useGetItemListMutation } from "../../redux/services/categoriesApi"
import Loader from "../../components/Loader/Loader"
import { FormattedMessage } from "react-intl";
import squareView from '../../assets/icons/checkbox-unchecked.svg'
import listView from '../../assets/icons/list.svg'
import noImage from '../../assets/icons/happySocks.svg'


const HomeCategory = ({
	nameShop,
	toggleViewHandler,
	toggleView
}) => {
	const {categories} = useSelector(state => state.categories)
	const [showProductsList, setShowProductsList] = useState(false)
	const [categoryNameChange, setCategoryNameChange] = useState(null)
	const [categoryIdChange, setCategoryIdChange] = useState(null)
	const [getItemList, {isLoading: isGetItemListLoading}] = useGetItemListMutation()
	const categoriesList = categories || []

	const showList = () => setShowProductsList(true)
	const hideList = () => setShowProductsList(false)

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

	if (showProductsList) {
		return isGetItemListLoading ? <Loader /> : <ProductList
			hideList={hideList}
			categoryNameChange={categoryNameChange}
		/>
	}

	return (
		<>
			<h1 className="home-title">
				<FormattedMessage id="categoryList" />
			</h1>
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
