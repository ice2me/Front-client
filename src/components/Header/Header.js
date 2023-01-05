import photo from '../../assets/images/avatar-user.png'
import thekeLogo from '../../assets/images/theke_logo-small.png'
import {
	useSelector
} from "react-redux"

const Header = () => {
	const {shop} = useSelector((state) => state.categories)

	return (
		<div className="header">
			<img
				src={thekeLogo}
				alt="theke logo"
			/>
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
					{shop?.shop_name}
				</span>
			</div>
		</div>
	)
}

export default Header
