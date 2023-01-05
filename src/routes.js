import {
	Route,
	Routes,
	useLocation
} from "react-router-dom"
import Home from "./views/Home/Home"
import {APP_ROUTE} from "./utils/constants"

export const RoutesLink = () => {
	const location = useLocation()
	// console.log(location.pathname)
	return (
		<Routes>
			{/*<Route path={APP_ROUTE.DEFAULT} element={<Home/>}/>*/}
			<Route path={APP_ROUTE.ENTRY} element={<Home/>}/>
			<Route path={APP_ROUTE.LINK_SHOP} element={<Home/>}/>
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