import photo from '../../assets/images/avatar-user.png'
import {
	useSelector
} from "react-redux"

const Header = () => {
	const {shop} = useSelector((state) => state.categories)

	return (
		<div className="header">
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
