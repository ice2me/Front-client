import { Navigate, Route, Routes } from "react-router-dom"
import Home from "./views/Home/Home"
import {APP_ROUTE} from "./utils/constants"
// import Login from "./views/Login/Login"

export const RoutesLink = () => {
	return (
		<Routes>
			<Route path={APP_ROUTE.DEFAULT} element={<Home/>}/>
			<Route path={APP_ROUTE.ENTRY} element={<Home/>}/>
			<Route path={APP_ROUTE.CATEGORIES_LIST} element={<Home/>}/>
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