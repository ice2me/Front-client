import React from 'react'
import viber from "../../assets/icons/viber.svg"
import telegram from "../../assets/icons/telegram.svg"
import instagram from "../../assets/icons/instagram.svg"
import facebook from "../../assets/icons/facebook.svg"

import close from "../../assets/icons/exit.svg"

const ContactSupport = ({toggleContactSupport, shop}) => {
	const contact = shop.socials_links
	return (
		<div className='profile'>
			<h1 className="productList-title">
				Contact Support
				<button
					className='productList-button'
					onClick={toggleContactSupport}
				>
					<img
						src={close}
						alt="close"
					/>
				</button>
			</h1>
			<div className="d-flex align-items-center flex-wrap justify-content-center h-50">
				<h2 className='fs-3'>
					Shop Contact:
				</h2>
				{
					contact?.shop_facebook &&
					<a href={contact?.shop_facebook}>
						<img
							src={facebook}
							alt="facebook"
						/>
					</a>
				}

				{
					contact?.shop_viber &&
					<a href={`viber://add?number=%${contact?.shop_viber}`}>
						<img
							src={viber}
							alt="viber"
						/>
					</a>
				}

				{
					contact?.shop_telegram &&
					<a href={`tg://resolve?domain=${contact?.shop_telegram}`}>
						<img
							src={telegram}
							alt="telegram"
						/>
					</a>
				}

				{
					contact?.shop_instagram &&
					<a href={`https://www.instagram.com/${contact?.shop_instagram}/`}>
						<img
							src={instagram}
							alt="instagram"
						/>
					</a>
				}
				<h2 className='fs-3 text-center mt-5'>
					If you have any questions regarding products, orders and delivery, then write to the support of the store.
				</h2>
			</div>
			<div className="d-flex align-items-center flex-wrap justify-content-center h-50">
				<h2 className='fs-3'>
					Developer Contact:
				</h2>
					<a href={`viber://add?number=%380669696402`}>
						<img
							src={viber}
							alt="viber"
						/>
					</a>
					<a href={`tg://resolve?domain=@ice2me`}>
						<img
							src={telegram}
							alt="telegram"
						/>
					</a>
					<a href={`https://www.instagram.com/serhiizuiev/`} target='_blank'>
						<img
							src={instagram}
							alt="instagram"
						/>
					</a>
				<h2 className='fs-3 text-center mt-5'>
					If you have any questions, problems and suggestions for improvement - you can write to developer.
				</h2>
			</div>

		</div>
	)
}

export default ContactSupport