import React from 'react'
import { FormattedMessage } from "react-intl"
import { useSelector } from "react-redux"
import facebook from "../../assets/icons/facebook.svg"
import instagram from "../../assets/icons/instagram.svg"
import telegram from "../../assets/icons/telegram.svg"
import viber from "../../assets/icons/viber.svg"
import photo from "../../assets/images/avatar-user.png"
import ShopLogo from "../../assets/images/default-shop-logo.png"
import PhoneIcon from "../../assets/icons/phone-black-icon.svg"
import { addSpace } from "../../utils/toggleSpaceString"

const Profile = () => {
	const {shop} = useSelector((state) => state.categories)
	const profile = shop
	return (
		<>
			<div className='profile'>
				<div className='home-wrapper_header profile-header'>
					<div className='home-wrapper_header-title'>
						<div
							className='home-wrapper_header-title_img'
							style={
								shop?.image_logo
									?
									{backgroundImage: `url(${shop?.image_logo})`}
									:
									{backgroundImage: `url(${ShopLogo})`}
							}
						>
						</div >
						<h1 className='home-wrapper_header-title_naming'>
							{shop?.shop_name ? addSpace(shop?.shop_name) : 'Shop Name'}
						</h1 >
					</div >
				</div >
				<div className='profile-body'>
					<div className='profile-body_wrapper'>
						<div
							className='profile-body_photo'
							style={
								profile?.image_logo
									?
									{backgroundImage: `url(${profile?.image_logo})`}
									:
									{backgroundImage: `url(${photo})`}
							}
						>
						</div >
					</div >
					<div className='profile-body_wrapper'>
						{
							profile?.description && <div className='profile-body_content-description'>
								<span className='profile-body_content-description_title'>
									<FormattedMessage id='forShopDescription' />
								</span >
									<p className='profile-body_content-description_text'>
										{profile?.description}
									</p >
								</div >
						}

						<div className='profile-body_content-socials'>
							<a href={`tel:${shop?.phone ? shop?.phone : '/'}`}className='profile-body_content-socials_phone'>
								<img
									className='profile-body_content-socials_phone-image'
									src={PhoneIcon}
									alt='Phone icon'
								/>
								+{shop?.phone ? shop?.phone : '380660000000'}
							</a >
							{/*<p >{profile?.email}</p >*/}
							<div className='profile-body_content-socials_block'>
								<p className='profile-body_content-socials_block-text'>
									Посилання на магазин:
								</p>
								{
									profile?.socials_links.shop_facebook &&
									<a
										href={profile?.socials_links.shop_facebook}
										target='_blank'
										rel='noreferrer noopener'
										className='profile-body_content-socials_block-link'
									>
									<img
										src={facebook}
										alt='facebook'
									/>
								</a >
								}

								{
									profile?.socials_links.shop_viber &&
									<a
										href={`${profile?.socials_links?.shop_viber}`}
										target='_blank'
										rel='noreferrer noopener'
										className='profile-body_content-socials_block-link'
									><img
										src={viber}
										alt='viber'
									/>
								</a >
								}

								{
									profile?.socials_links.shop_telegram &&
									<a
										href={`tg://resolve?domain=${profile?.socials_links.shop_telegram}`}
										target='_blank'
										rel='noreferrer noopener'
										className='profile-body_content-socials_block-link'
									>
									<img
										src={telegram}
										alt='telegram'
									/>
								</a >
								}

								{
									profile?.socials_links.shop_instagram &&
									<a
										href={`https://www.instagram.com/${profile?.socials_links.shop_instagram}/`}
										target='_blank'
										rel='noreferrer noopener'
										className='profile-body_content-socials_block-link'
									>
									<img
										className='profile-body_content-socials_instagram'
										src={instagram}
										alt='instagram'
									/>
								</a >
								}
							</div>
						</div >
					</div >
				</div >
			</div >
		</>
	)
}

export default Profile