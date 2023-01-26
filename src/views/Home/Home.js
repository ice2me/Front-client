/* eslint-disable */
import React, { useEffect } from 'react'
import { useGetCategoriesMutation } from "../../redux/services/categoriesApi"
import {
	useLocation,
	useNavigate
} from "react-router-dom";
import Loader from "../../components/Loader/Loader"
import HomeCategory from "./HomeCategory"
import arrowDown from "../../assets/icons/arrowDown.svg";

const Home = () => {
	const [getCategories, {isLoading: isGetCategoriesLoader}] = useGetCategoriesMutation()
	const navigate = useNavigate()
	const location = useLocation()
	const urlSplit = location.pathname.split("/")
	const nameShop = urlSplit[urlSplit.length - 1]
	// console.log(location)
	useEffect(() => {
		async function getListCat() {
			await getCategories(nameShop)
		}
		getListCat()
	}, [])

	if (isGetCategoriesLoader) {
		return <Loader />
	}

	return (
		<div className='home'>
			<HomeCategory nameShop={nameShop}/>
		</div>
	);
};

export default Home