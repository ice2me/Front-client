/* eslint-disable */
import React, {
	useCallback,
	useEffect,
	useState
} from 'react'
import {
	Button,
	Form,
	Modal,
	Tab,
	Tabs
} from "react-bootstrap"
import { Formik } from "formik"
import { getBasketFormSchema } from "../../utils/validation/yupUpdateUser"
import { usePostBasketFormClientMutation } from "../../redux/services/categoriesApi"
import {
	useDispatch,
	useSelector
} from "react-redux"
import { resetBasket } from "../../redux/slices/categoriesSlice"
import { toast } from "react-toastify"
import {
	FormattedMessage,
	useIntl
} from "react-intl"
import Loader from "../Loader/Loader";
import NovaPoshta from "novaposhta/src/NovaPoshta";
import { Typeahead } from "react-bootstrap-typeahead";
import { API_KEY_NOVAPOSHTA } from "../../utils/constants";

const ModalFormToOrder = ({
	show,
	onHide,
	items
}) => {
	const [form, setForm] = useState({})
	const [reqMessage, setReqMessage] = useState('')
	// const [itemsArrSplitter, setItemsArrSplitter] = useState([])
	const [productsArr, setProductsArr] = useState([])
	const {shop} = useSelector(state => state.categories)
	const {formatMessage} = useIntl()
	const [postBasketFormClient, {isLoading: isPostBasketFormClientLoading}] = usePostBasketFormClientMutation()
	const dispatch = useDispatch()
	// TODO NOVAPOSHTA SECTION START_______________________________
	const apiNovaposhta = new NovaPoshta({ apiKey: API_KEY_NOVAPOSHTA })
// TODO NOVAPOSHTA CITIES_______________________________
	const [getNovaposhtaAllInfo, setGetNovaposhtaAllInfo] = useState([])
	const [namingNovaposhtaCities, setNamingNovaposhtaCities] = useState([])
	const [changeNovaposhtaCities, setChangeNovaposhtaCities] = useState([])
// TODO NOVAPOSHTA branch_______________________________
	const [namingNovaposhtaBranch, setNamingNovaposhtaBranch] = useState([])
	const [changeNovaposhtaBranch, setChangeNovaposhtaBranch] = useState([])

	const getUnique = (arr) => {
		return arr.filter((el, ind) => ind === arr.indexOf(el));
	}
	// TODO NOVAPOSHTA BRANCH Functions start_______________________________
	const getNovaposhtaInfoHandler = useCallback(async () => {
		try {
			const {data} = await apiNovaposhta.address.getWarehouses({REF: ''})
			setGetNovaposhtaAllInfo(data)

			const tehDataCities = data.map(item => item.CityDescription)
			const tehUniqNamesCities = getUnique(tehDataCities)
			setNamingNovaposhtaCities(tehUniqNamesCities)
		}catch (e) {
			if (Array.isArray(e)) {
				e.forEach((error) => console.log(`[${ error.code || '-' }] ${ error.en || error.uk || error.ru || error.message }`))
			}
		}
	}, [])

	useEffect(() => {
		getNovaposhtaInfoHandler()
	}, [])


	useEffect(() => {
		let arr = []
		getNovaposhtaAllInfo.map(item => {
			if (item.CityDescription === changeNovaposhtaCities[0]) {
				return arr = [...arr, item.Description]
			}
		})
		setNamingNovaposhtaBranch(arr)
	}, [changeNovaposhtaCities])
	// TODO NOVAPOSHTA BRANCH Functions finish_______________________________

	// TODO NOVAPOSHTA SECTION END_______________________________

	const formDateUpdateHandler = (opt) => {
		setForm({...form, ...opt})
	}
	// const arraySplitter = (arr, qtyItems) => {
	// 	let countItems = 0
	// 	const lengthArr = arr.length
	// 	const resultArr = []
	// 	const splitter = (arr) => {
	// 		if (countItems >= lengthArr) {
	// 			return
	// 		}
	// 		resultArr.push(arr.slice(countItems, countItems + qtyItems))
	// 		countItems = countItems + qtyItems
	// 		splitter(arr)
	// 	}
	// 	splitter(arr)
	// 	return resultArr
	// }

	// useEffect(() => {
	// 	setItemsArrSplitter(arraySplitter(items, 10))
	// }, [items])

	useEffect(() => {
		const productArrForMessage = items.map(item => {
			const e = new Object()
			e.name_product = item.name_product,
				e.price_product = item.price_product,
				e.unit_product = item.unit_product,
				e.total_price = item.total_price
			e.currency_product = item.currency_product
			e.count = item.count
			return e
		})
		setProductsArr(productArrForMessage)
	}, [items])


	const handleSubmit = async (values,
		{
			setErrors,
			resetForm
		}) => {
		const formDate = {
			username: values.username,
			phone: values.phone,
			user_email: values.user_email,
			city: values.city || changeNovaposhtaCities[0],
			address: values.address || changeNovaposhtaBranch[0],
			comment_message: values.comment_message,
			items: productsArr,
			shop_id: shop?._id,
			shop_email: shop?.email,
			shop_name: shop?.shop_name,
			calculate_total_cost: shop?.calculate_total_cost
		}

		try {
			// if (items.length <= 10) {
			const {data} = await postBasketFormClient(formDate)
			dispatch(resetBasket())
			// toast(data?.message)
			setReqMessage(data?.message)
			resetForm()
			setTimeout(() => onHide(), 2500)
			// }
			// else {
			// 	const dataReq = []
			// 	for (let i = 0; i < itemsArrSplitter.length; i++) {
			// 		const {data} = await postBasketFormClient({
			// 			...formDate,
			// 			items: itemsArrSplitter[i]
			// 		})
			// 		dataReq.push(data)
			// 	}
			// 	dispatch(resetBasket())
			// 	// toast(dataReq[0]?.message)
			// 	setReqMessage(dataReq[0]?.message)
			// 	resetForm()
			// 	setTimeout(() => onHide(), 2500)
			// }
		} catch (e) {
			console.log(e)
			resetForm()
		}
	}

	if (isPostBasketFormClientLoading) {
		return <Loader />
	}

	return (
		<Modal
			show={show}
			onHide={onHide}
			centered
			backdrop="static"
			keyboard={true}
			size={'lg'}
		>
			{
				reqMessage
					?
					<div className='fs-2 p-5 text-center'>
						{reqMessage}
					</div>

					:
					<Formik
						validateOnChange
						initialValues={{
							phone: '',
							username: '',
							user_email: '',
							city: '',
							address: '',
							comment_message: ''
						}}
						validationSchema={getBasketFormSchema}
						onSubmit={handleSubmit}
						enableReinitialize
					>
						{({
							values,
							errors,
							touched,
							handleChange,
							handleBlur,
							isValid,
							handleSubmit,
							dirty
						}) => (
							<Form
								className="registrationShop-form"
								onSubmit={handleSubmit}
							>
								<Modal.Header closeButton>
									<Modal.Title>
										<FormattedMessage id='toOrderForm' />
									</Modal.Title>
								</Modal.Header>
								<Modal.Body>
									<Form.Group
										className="mb-3"
										controlId="exampleForm.ControlInput1"
									>
										<Form.Label>
											<FormattedMessage id='phone' />*
										</Form.Label>
										<Form.Control
											type="phone"
											className={`pe-5  ${touched.phone ? "is-touch " : ""} ${
												errors.phone && touched.phone ? " is-invalid" : ""
											} registrationShop-form_input`}
											placeholder="+380 ..."
											required
											onBlur={handleBlur}
											autoFocus='on'
											autoComplete='on'
											name='phone'
											value={values.phone}
											onChange={(e) => {
												handleChange(e)
												formDateUpdateHandler({
													[e.target.name]: e.target.value
												})
											}}
										/>
										{errors.phone && touched.phone && (
											<Form.Control.Feedback type="invalid">
												{errors.phone}
											</Form.Control.Feedback>
										)}
									</Form.Group>

									<Form.Group
										className="mb-3"
										controlId="exampleForm.ControlInput2"
									>
										<Form.Label>
											<FormattedMessage id='name' />*
										</Form.Label>
										<Form.Control
											type="text"
											className={`pe-5  ${touched.username ? "is-touch " : ""} ${
												errors.username && touched.username ? " is-invalid" : ""
											} registrationShop-form_input`}
											placeholder={formatMessage({id: 'yourName'})}
											required
											onBlur={handleBlur}
											name='username'
											onChange={(e) => {
												handleChange(e)
												formDateUpdateHandler({
													[e.target.name]: e.target.value
												})
											}}
										/>
										{errors.username && touched.username && (
											<Form.Control.Feedback type="invalid">
												{errors.username}
											</Form.Control.Feedback>
										)}
									</Form.Group>

									<Form.Group className="registrationShop-form_label">
										<div className='registrationShop-form_title'>
											<Form.Label>
												<FormattedMessage id="email" />
											</Form.Label>
										</div>
										<Form.Control
											className={`pe-5  ${touched.email ? "is-touch " : ""} ${
												errors.email && touched.email ? " is-invalid" : ""
											} registrationShop-form_input`}
											type="email"
											placeholder={formatMessage({id: 'enterEmail'})}
											name='user_email'
											onBlur={handleBlur}
											onChange={(e) => {
												handleChange(e)
												formDateUpdateHandler({
													[e.target.name]: e.target.value
												})
											}}
										/>
										{errors.email && touched.email && (
											<Form.Control.Feedback type="invalid">
												{errors.email}
											</Form.Control.Feedback>
										)}
									</Form.Group>
{/*TODO *********************DELIVERY SECTION START******************************/}
									<Tabs defaultActiveKey={'delivery'} className='mt-3 delivery-header' >
{/*TODO *********************DELIVERY BLOCK******************************/}
										<Tab
											className='delivery-window'
											eventKey={'delivery'}
											title={'delivery'}
										>
											<Form.Group
												className="mb-3"
												controlId="exampleForm.ControlInput3"
											>
												<Form.Label>
													<FormattedMessage id='city' />
												</Form.Label>
												<Form.Control
													type="text"
													className={`pe-5  ${touched.city ? "is-touch " : ""} ${
														errors.city && touched.city ? " is-invalid" : ""
													} registrationShop-form_input`}
													placeholder={formatMessage({id: 'city'})}
													onBlur={handleBlur}
													name='city'
													onChange={(e) => {
														handleChange(e)
														formDateUpdateHandler({
															[e.target.name]: e.target.value
														})
													}}
												/>
												{errors.city && touched.city && (
													<Form.Control.Feedback type="invalid">
														{errors.city}
													</Form.Control.Feedback>
												)}
											</Form.Group>
											<Form.Group
												className="mb-3"
												controlId="exampleForm.ControlInput4"
											>
												<Form.Label>
													<FormattedMessage id='address' />
												</Form.Label>
												<Form.Control
													type="text"
													className={`pe-5  ${touched.address ? "is-touch " : ""} ${
														errors.address && touched.address ? " is-invalid" : ""
													} registrationShop-form_input`}
													placeholder={formatMessage({id: 'address'})}
													onBlur={handleBlur}
													name='address'
													onChange={(e) => {
														handleChange(e)
														formDateUpdateHandler({
															[e.target.name]: e.target.value
														})
													}}
												/>
												{errors.address && touched.address && (
													<Form.Control.Feedback type="invalid">
														{errors.address}
													</Form.Control.Feedback>
												)}
											</Form.Group>
										</Tab>
{/*TODO *********************NOVAPOSHTA SECTION******************************/}
										<Tab
											className='delivery-window'
											eventKey={'novaposhta'}
											title={'novaposhta'}
										>
											<Form.Group
												className="mb-3"
												controlId="exampleForm.ControlInput5"
											>
											<Form.Label>
												<FormattedMessage id='city' />
											</Form.Label>
											<Typeahead
												id="basic-typeahead-single"
												labelKey="searchProduct"
												onChange={setChangeNovaposhtaCities}
												options={namingNovaposhtaCities}
												// placeholder={formatMessage({id: 'nameProduct'})}
												placeholder={'Cities'}
												selected={changeNovaposhtaCities}
											/>
										</Form.Group>

											<Form.Group
												className="mb-3"
												controlId="exampleForm.ControlInput6"
											>
												<Form.Label>
													{/*<FormattedMessage id='city' />*/}
													Otdelenie
												</Form.Label>
											<Typeahead
												id="basic-typeahead-single"
												labelKey="searchProduct"
												onChange={setChangeNovaposhtaBranch}
												options={namingNovaposhtaBranch}
												// placeholder={formatMessage({id: 'nameProduct'})}
												placeholder={'Branch'}
												selected={changeNovaposhtaBranch}
											/>
											</Form.Group>
										</Tab>
									</Tabs>
{/*TODO *********************DELIVERY SECTION FINISH******************************/}
									<Form.Group
										className="mb-3"
										controlId="exampleForm.ControlInput5"
									>
										<Form.Label>
											<FormattedMessage id='commentMessage' />
										</Form.Label>
										<Form.Control
											type="text"
											as="textarea"
											className={`pe-5  ${touched.comment_message ? "is-touch " : ""} ${
												errors.comment_message && touched.comment_message ? " is-invalid" : ""
											} registrationShop-form_input`}
											placeholder={formatMessage({id: 'commentMessage'})}
											onBlur={handleBlur}
											name='comment_message'
											onChange={(e) => {
												handleChange(e)
												formDateUpdateHandler({
													[e.target.name]: e.target.value
												})
											}}
										/>
										{errors.comment_message && touched.comment_message && (
											<Form.Control.Feedback type="invalid">
												{errors.comment_message}
											</Form.Control.Feedback>
										)}
									</Form.Group>


								</Modal.Body>
								<Modal.Footer>
									<Button
										variant="secondary"
										onClick={onHide}
									>
										<FormattedMessage id='close' />
									</Button>
									<Button
										variant="primary"
										type='submit'
										disabled={(!isValid && dirty) || isPostBasketFormClientLoading}
									>
										<FormattedMessage id='send' />
									</Button>
								</Modal.Footer>
							</Form>
						)}
					</Formik>
			}
		</Modal>
	)
}

export default ModalFormToOrder