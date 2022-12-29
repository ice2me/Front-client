import photo from '../../assets/images/avatar-user.png'
import facebook from '../../assets/icons/facebook.svg'
import viber from '../../assets/icons/viber.svg'
import telegram from '../../assets/icons/telegram.svg'
import instagram from '../../assets/icons/instagram.svg'
import close from "../../assets/icons/exit.svg"
import React from "react"

const Profile = ({
	profile,
	toggleProfile
}) => {

	return (
		<div className='profile'>
			<h1 className="productList-title">
				Profile {profile.username}
				<button
					className='productList-button'
					onClick={toggleProfile}
				>
					<img
						src={close}
						alt="close"
					/>
				</button>
			</h1>
			<div className='profile-body'>
				<div className='profile-body_wrapper'>
					<div
						className="profile-body_photo"
						style={
							profile?.image_logo
							? {backgroundImage: `url(${profile?.image_logo})`}
							:
							{backgroundImage: `url(${photo})`}
						}
					>
					</div>
				</div>
				<div className='profile-body_wrapper'>
					<ul className="profile-body_content">
						<li className="profile-body_content-text">
							<span>name:</span>
							<p>{profile.username}</p>
						</li>
						<li className="profile-body_content-text">
							<span>Phone:</span>
							<p>+{profile.phone}</p>
						</li>
						<li className="profile-body_content-text">
							<span>Email:</span>
							<p>{profile.email}</p>
						</li>
						<li className="profile-body_content-text">
							<span>Name shop:</span>
							<p>{profile.shop_name}</p>
						</li>
						{
							profile.description && <li className="profile-body_content-text">
								<span>Description shop:</span>
								<p className='profile-body_content-text_description'>
									{profile.description}
								</p>
							</li>
						}
					</ul>
					<div className="profile-body_content-socials">
						{
							profile?.socials_links.shop_facebook &&
							<a href={profile?.socials_links.shop_facebook}>
								<img
									src={facebook}
									alt="facebook"
								/>
							</a>
						}

						{
							profile?.socials_links.shop_viber &&
							<a href={`viber://add?number=%${profile?.socials_links.shop_viber}`}>
								<img
									src={viber}
									alt="viber"
								/>
							</a>
						}

						{
							profile?.socials_links.shop_telegram &&
							<a href={`tg://resolve?domain=${profile?.socials_links.shop_telegram}`}>
								<img
									src={telegram}
									alt="telegram"
								/>
							</a>
						}

						{
							profile?.socials_links.shop_instagram &&
							<a href={`https://www.instagram.com/${profile?.socials_links.shop_instagram}/`}>
								<img
									className='profile-body_content-socials_instagram'
									src={instagram}
									alt="instagram"
								/>
							</a>
						}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Profile
