import {
	Route,
	Routes,
	useLocation
} from "react-router-dom"
import React, {
	useCallback,
	useEffect,
	useState
} from "react"
import { APP_ROUTE } from "./utils/constants"
import Home from "./pages/Home/Home"

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
		document.title = nameShop
	}, [])

	return (
		<Routes >
			<Route
				path={APP_ROUTE.DEFAULT}
				element={<Home />}
			/>
			<Route
				path={APP_ROUTE.ENTRY}
				element={<Home />}
			/>
			<Route
				path={nameShop}
				element={<Home />}
			/>
		</Routes >
	)
}
