import { useSelector } from "react-redux"
import React, {
	useEffect,
	useState
} from "react"
import ProductList from "../ProductList/ProductList"
import { useGetItemListMutation } from "../../redux/services/categoriesApi"
import Loader from "../../components/Loader/Loader"
import { FormattedMessage } from "react-intl";


const HomeCategory = ({nameShop}) => {
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
				<FormattedMessage id="categoryList"/>
			</h1>
			{
				categoriesList.length < 1
				&&
				<h1 className="productList-arrowDown">
					<FormattedMessage id='thisStoreHasNotAddedProductYet'/>
				</h1>
			}
			<div
				className="home-body_accordingHeader"
			>
				<div
					className="home-body_accordingHeader-wrapper"
				>
					{
						categoriesList?.map((category, index) => (
							<div
								className='home-body_accordingHeader-item'
								key={category?._id}
							>
						<span
							data-category={category?.category_name}
							onClick={() => {
								setCategoryIdChange(category?._id)
								setCategoryNameChange(category?.category_name)
								showList()
							}}
						>
							{category?.category_name}
						</span>
							</div>
						))
					}
				</div>
			</div>
		</>
	)
}

export default HomeCategory
