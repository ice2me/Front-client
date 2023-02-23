import {
	Route,
	Routes,
	useLocation
} from "react-router-dom"
import Home from "./views/Home/Home"
import { APP_ROUTE } from "./utils/constants"
import React, {
	useCallback,
	useEffect,
	useState
} from "react"
import StoreSelection from "./views/StoreSelection/StoreSelection"

export const RoutesLink = () => {
	const location = useLocation()
	const urlSplit = location.pathname.split("/")
	const nameShop = urlSplit[urlSplit.length - 1]

	const [toggleView, setToggleView] = useState(false)
	const toggleViewHandler = () => {
		setToggleView(!toggleView)
		localStorage.setItem('viewCategories', JSON.stringify({'view': !toggleView}))
	}
	const getLocalStorageViewOption = useCallback(() => {
		const teh = JSON?.parse(localStorage?.getItem('viewCategories'))?.view
		setToggleView(teh)
	}, [])

	useEffect(() => {
		getLocalStorageViewOption()
	}, [])

	return (
		<Routes>
			<Route
				path={APP_ROUTE.DEFAULT}
				element={<StoreSelection />}
			/>
			<Route
				path={APP_ROUTE.ENTRY}
				element={<StoreSelection />}
			/>
			<Route
				path={nameShop}
				element={<Home
					toggleViewHandler={toggleViewHandler}
					toggleView={toggleView}
				/>}
			/>
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