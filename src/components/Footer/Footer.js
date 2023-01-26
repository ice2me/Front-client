/* eslint-disable */
import React, { useState } from 'react'
import myBasket from "../../assets/icons/backet.svg"
import myProfile from "../../assets/icons/profile-icon.svg"
import contactSupport from "../../assets/icons/contact-support-icon.svg"
import { useSelector } from "react-redux"
import Profile from "../../views/Profile/Profile"
import ContactSupport from "../../views/ContactSupport/ContactSupport"
import Basket from "../../views/Basket/Basket"

const Footer = () => {
	const [openProfile, setOpenProfile] = useState(false)
	const [openContactSupport, setOpenContactSupport] = useState(false)
	const [openBasket, setOpenBasket] = useState(false)
	const {
		shop,
		basket
	} = useSelector((state) => state.categories)

	// const logoutHandler = () => {
	// 	dispatch(logout())
	// 	navigate(APP_ROUTE.LOGIN)
	// 	toast('Your exit')
	// }

	const toggleProfile = () => setOpenProfile(!openProfile)
	const toggleContactSupport = () => setOpenContactSupport(!openContactSupport)
	const toggleBasket = () => setOpenBasket(!openBasket)

	if (openProfile) {
		return <Profile
			toggleProfile={toggleProfile}
			profile={shop}
		/>
	}

	if (openContactSupport) {
		return <ContactSupport
			toggleContactSupport={toggleContactSupport}
			shop={shop}
		/>
	}

	if (openBasket) {
		return <Basket
			items={basket}
			toggleBasket={toggleBasket}
		/>
	}


	return (
		<ul className="header-right">
			{/*<li className="header-right_item">*/}
			{/*	<button*/}
			{/*		onClick={logoutHandler}*/}
			{/*		className="header-right_item-link"*/}
			{/*	>*/}
			{/*		<img*/}
			{/*			src={exit}*/}
			{/*			alt="exit"*/}
			{/*			title="Log Out"*/}
			{/*		/>*/}
			{/*	</button>*/}
			{/*</li>*/}
			<li className="header-right_item">
				<button
					onClick={toggleContactSupport}
					className="header-right_item-link"
				>
					<img
						src={contactSupport}
						alt="Contact Support"
						title="Contact Support"
					/>
				</button>
			</li>
			<li className="header-right_item">
				<button
					onClick={toggleBasket}
					className="header-right_item-link"
				>
					<img
						src={myBasket}
						alt="My basket"
						title="My basket"
					/>
					<span className='header-right_item-link_count'>{
						basket?.length >= 1
							?
							basket?.length
							:
							'0'
					}</span>

				</button>
			</li>
			<li className="header-right_item">
				<button
					onClick={toggleProfile}
					className="header-right_item-link"
				>
					<img
						src={myProfile}
						alt="Shop Profile"
						title="Shop Profile"
					/>
				</button>
			</li>
		</ul>
	)
}

export default Footer