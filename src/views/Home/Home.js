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
import arrowDown from "../../assets/icons/arrowDown.svg";
import StoreSelection from "../StoreSelection/StoreSelection";
import { APP_ROUTE } from "../../utils/constants";
import myBasket from "../../assets/icons/backet.svg";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import Basket from "../Basket/Basket";

const Home = () => {
	const [getCategories, {isLoading: isGetCategoriesLoader}] = useGetCategoriesMutation()
	const navigate = useNavigate()
	const location = useLocation()
	const urlSplit = location.pathname.split("/")
	const nameShop = urlSplit[urlSplit.length - 1]


	useEffect(() => {
		async function getListCat() {
			const data = await getCategories(nameShop)
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
			<HomeCategory nameShop={nameShop} />
		</div>
	);
};

export default Home