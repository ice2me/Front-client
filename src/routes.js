import {
	Route,
	Routes,
	useLocation
} from "react-router-dom"
import Home from "./views/Home/Home"
import {APP_ROUTE} from "./utils/constants"
import React, { useEffect } from "react";
import Loader from "./components/Loader/Loader";
import { useGetCategoriesMutation } from "./redux/services/categoriesApi";
import StoreSelection from "./views/StoreSelection/StoreSelection";

export const RoutesLink = () => {
	const location = useLocation()
	const urlSplit = location.pathname.split("/")
	const nameShop = urlSplit[urlSplit.length - 1]

	return (
		<Routes>
			<Route path={APP_ROUTE.DEFAULT} element={<StoreSelection/>}/>
			<Route path={APP_ROUTE.ENTRY} element={<StoreSelection/>}/>
			<Route path={nameShop} element={<Home/>}/>
		</Routes>
	)
}
export const RoutesLinkLogin = () => {
	return (
		<Routes>
			{/*<Route path={APP_ROUTE.ENTRY} element={<Login/>}/>*/}
			{/*<Route path={APP_ROUTE.LOGIN} element={<Login/>}/>*/}
		</Routes>
	)
}