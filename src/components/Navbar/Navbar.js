import React, { useState } from 'react'
import { APP_ROUTE } from "../../utils/constants"
import myProducts from "../../assets/icons/note-list-icon.svg"
import myProfile from "../../assets/icons/profile-icon.svg"
import contactSupport from "../../assets/icons/contact-support-icon.svg"
import eye from "../../assets/icons/eye.svg"
import eyeOff from "../../assets/icons/eye-blocked.svg"
import {
	useLocation,
	useNavigate
} from "react-router-dom"
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import Profile from "../../views/Profile/Profile";
import ContactSupport from "../../views/ContactSupport/ContactSupport";
import Basket from "../../views/Basket/Basket";
import myBasket from "../../assets/icons/backet.svg";

const Navbar = () => {
	const [toggleNavbar, setToggleNavbar] = useState(false)
	const location = useLocation()
	const navigate = useNavigate()

	const [openProfile, setOpenProfile] = useState(false)
	const [openContactSupport, setOpenContactSupport] = useState(false)
	const [openBasket, setOpenBasket] = useState(false)
	const {
		shop,
		basket
	} = useSelector((state) => state.categories)
	const variantTrading = shop?.variant_trading
	const openShopForUser = shop?.open_shop

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
		<ul className={`navbarApp ${toggleNavbar ? "hideNavbar" : ""}`}>
			<button
				className='navbarApp_eye'
				onClick={() => setToggleNavbar(!toggleNavbar)}
			>
				<img
					src={toggleNavbar ? eyeOff : eye}
					alt="eye"
				/>
			</button>
			<li
				className={`navbarApp_item ${(location.pathname === APP_ROUTE.CATEGORIES_LIST ||
					location.pathname === APP_ROUTE.DEFAULT ||
					location.pathname === APP_ROUTE.PRODUCTS_LIST)
					? 'activeButton' : ''}`}
				onClick={toggleContactSupport}
			>
				<img
					src={contactSupport}
					alt="Contact Support"
					title="Contact Support"
				/>
				{!toggleNavbar && <FormattedMessage id='contactSupport' />}
			</li>
			{
				variantTrading === "Shop"
				&&
				<li
					className={`navbarApp_item
					${location.pathname === APP_ROUTE.PROFILE ? 'activeButton' : ''}
					`}
					onClick={toggleBasket}
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

					{!toggleNavbar && <FormattedMessage id='myBasket' />}
				</li>
			}
			<li
				className={`navbarApp_item
					${location.pathname === APP_ROUTE.CONTACT_SUPPORT ? 'activeButton' : ''}
					`}
				onClick={toggleProfile}
			>
				<img
					src={myProfile}
					alt="Shop Profile"
					title="Shop Profile"
				/>
				{!toggleNavbar && <FormattedMessage id='profile' />}
			</li>
			{openShopForUser
				&&
				<li
					className="navbarApp_item storeSelection-button"
					onClick={() => navigate('/')}
				>
					<img
						src={myProducts}
						alt="Shop Profile"
						title="Shop Profile"
					/>
					{!toggleNavbar && <FormattedMessage id='showAllShops' />}
				</li>
			}
		</ul>
	)
}

export default Navbar