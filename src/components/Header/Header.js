/* eslint-disable */
import photo from '../../assets/images/avatar-user.png'
import thekeLogo from '../../assets/images/theke-logo-white.png'
import {
	useSelector
} from "react-redux"
import {
	Container,
	Nav,
	Navbar
} from "react-bootstrap";
import {
	FormattedMessage,
	useIntl
} from "react-intl";
import { APP_ROUTE } from "../../utils/constants";
import contactSupport from "../../assets/icons/contact-support-icon.svg";
import myBasket from "../../assets/icons/backet.svg";
import myProfile from "../../assets/icons/profile-icon.svg";
import React, {
	useEffect,
	useState
} from "react";
import Profile from "../../views/Profile/Profile";
import ContactSupport from "../../views/ContactSupport/ContactSupport";
import Basket from "../../views/Basket/Basket";
import myProducts from "../../assets/icons/note-list-icon.svg";
import { useNavigate } from "react-router-dom";
import { addSpace } from "../../utils/toggleSpaceString";

const Header = () => {
	const [openProfile, setOpenProfile] = useState(false)
	const [toggleNavbar, setToggleNavbar] = useState(false)
	const [openContactSupport, setOpenContactSupport] = useState(false)
	const [openBasket, setOpenBasket] = useState(false)
	const {
		shop,
		basket
	} = useSelector((state) => state.categories)
	const navigate = useNavigate()
	const {formatMessage} = useIntl()
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
		<>
			<div className="header">
				<a href='https://theke.com.ua'>
					<img
						src={thekeLogo}
						alt="theke logo"
					/>
				</a>
				<div className="header-left">
					<div
						className='header-left_logo'
						style={
							shop?.image_logo
								?
								{backgroundImage: `url(${shop?.image_logo})`}
								:
								{backgroundImage: `url(${photo})`}
						}
					>
					</div>
					<span className="header-left_status">
						{addSpace(shop?.shop_name)}
					</span>
				</div>
			</div>

			<Navbar
				bg="light"
				expand="lg"
				className="header-mob"
				collapseOnSelect='true'
			>
				<Container className='d-flex'>
					<div className="header-mob-left">
						<div
							className='header-mob-left_logo'
							style={
								shop?.image_logo
									?
									{backgroundImage: `url(${shop?.image_logo})`}
									:
									{backgroundImage: `url(${photo})`}
							}
						>
						</div>
						<div className="header-mob_left">
											<span className="header-mob_left_status">
												{addSpace(shop?.shop_name)}
											</span>
						</div>
					</div>
					<div
						className={`header-mob-left_basket
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
					</div>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto">
							<div className="header-mob_center">
								<ul className='header-mob_center-wrapper'>
									<li className='d-inline-flex align-items-center'>
										<span className="header-left_status mx-3">
										</span>
										<a href='https://theke.com.ua'>
											<img
												className='header-mob-left_theke'
												src={thekeLogo}
												alt="theke logo"
											/>
										</a>
									</li>
									{
										variantTrading === "Shop"
										&&
										<li
											className={`navbarApp_item ${location.pathname === APP_ROUTE.PROFILE ? 'activeButton' : ''}`}
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
									<li
										className={`navbarApp_item ${location.pathname ===
										APP_ROUTE.CONTACT_SUPPORT ? 'activeButton' : ''}`}
										onClick={toggleProfile}
									>
										<img
											src={myProfile}
											alt="Shop Profile"
											title="Shop Profile"
										/>
										{!toggleNavbar && <FormattedMessage id='profile' />}
									</li>
									{
										openShopForUser
										&&
										<li
											className="navbarApp_item"
											onClick={() => navigate('/')}
										>
											<img
												src={myProducts}
												alt="Shops"
												title="Shops"
											/>
											{!toggleNavbar && <FormattedMessage id='showAllShops' />}
										</li>
									}

								</ul>
							</div>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<div
				className={`basket-fixed ${location.pathname === APP_ROUTE.PROFILE ? 'activeButton' : ''}`}
				onClick={toggleBasket}
			>
				<img
					src={myBasket}
					alt="My basket"
					title="My basket"
				/>
				<span className='header-right_item-link_count basket-fixed_count'>{
					basket?.length >= 1
						?
						basket?.length
						:
						'0'
				}</span>
			</div>
		</>

	)
}

export default Header
