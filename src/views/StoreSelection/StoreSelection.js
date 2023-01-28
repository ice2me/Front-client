import React, {
	useEffect,
	useState
} from 'react'
import {
	Button,
	Card,
	Form
} from "react-bootstrap"
import img from '../../assets/images/avatar-user.png'
import Loader from "../../components/Loader/Loader"
import {
	useGetAllShopMutation
} from "../../redux/services/categoriesApi"
import { useNavigate } from "react-router-dom";

const StoreSelection = () => {
	const [getAllShop, {isLoading: isAllShopClientLoader}] = useGetAllShopMutation()
	const [listShops, setListShops] = useState([])
	const navigate = useNavigate()

	useEffect(() => {
		async function getAllShopsList() {
			const data = await getAllShop()
			setListShops(data?.data.arrShopsList)
		}

		getAllShopsList()
	}, [])
	if (isAllShopClientLoader) {
		return <Loader />
	}

	const reLink = (linkName) => {
		navigate(`${linkName}`)
	}
	return (
		<div className='storeSelection'>
			<div className="storeSelection-wrapper">
				<div className="storeSelection-search">
					<Form className="d-flex">
						<Form.Control
							type="search"
							placeholder="Search"
							className="me-2"
							aria-label="Search"
						/>
						<Button variant="primary">Search</Button>
					</Form>
				</div>
				<div className="storeSelection-list">
					<div className="storeSelection-list_body">
						{
							listShops.map((shop, index) => (
									<Card key={shop?.shop_name + index}>
										<Card.Img
											variant="top"
											src={shop?.image_logo === '' ? img : shop?.image_logo}
										/>
										<Card.Body>
											<Card.Title>{shop?.shop_name}</Card.Title>
											<Card.Text>{shop?.description}</Card.Text>
											<Button
												variant="primary"
												onClick={() => reLink(shop?.shop_name)}
											>Go to {shop?.shop_name}</Button>
										</Card.Body>
									</Card>
								)
							)
						}
					</div>
				</div>
			</div>
		</div>
	)
}

export default StoreSelection