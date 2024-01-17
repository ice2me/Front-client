/* eslint-disable */
import React, {
	useEffect,
	useState
} from 'react'
import { useGetCategoriesMutation } from "../../redux/services/categoriesApi"
import {
	useLocation,
	useNavigate
} from "react-router-dom";
import Loader from "../../components/Loader/Loader"
import HomeCategory from "./HomeCategory"

const Home = ({
	toggleViewHandler,
	toggleView
}) => {
	const [errorMessage, setErrorMessage] = useState('')
	const [getCategories, {isLoading: isGetCategoriesLoader}] = useGetCategoriesMutation()
	const navigate = useNavigate()
	const location = useLocation()
	const urlSplit = location.pathname.split("/")
	const nameShop = urlSplit[urlSplit.length - 1]


	useEffect(() => {
		async function getListCat() {
			const data = await getCategories(nameShop)
			if (data?.data?.shop?.paid_subscription === false) {
				setErrorMessage(data.data.message)
			}
			if (data.error) {
				navigate('/')
			}
		}

		getListCat()
	}, [])

	if (isGetCategoriesLoader) {
		return <Loader />
	}

	return (
		<div className='home'>
			<HomeCategory
				nameShop={nameShop}
				toggleViewHandler={toggleViewHandler}
				toggleView={toggleView}
				errorMessage={errorMessage}
			/>
		</div>
	);
};

export default Home