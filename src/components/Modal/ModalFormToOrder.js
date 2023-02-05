/* eslint-disable */
import React, {
	useEffect,
	useState
} from 'react'
import {
	Button,
	Form,
	Modal
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

const ModalFormToOrder = ({
	show,
	onHide,
	items
}) => {
	const [form, setForm] = useState({})
	const [reqMessage, setReqMessage] = useState('')
	const [itemsArrSplitter, setItemsArrSplitter] = useState([])
	const {shop} = useSelector(state => state.categories)
	const {formatMessage} = useIntl()
	const [postBasketFormClient, {isLoading: isPostBasketFormClientLoading}] = usePostBasketFormClientMutation()
	const dispatch = useDispatch()
	const formDateUpdateHandler = (opt) => {
		setForm({...form, ...opt})
	}
	const arraySplitter = (arr, qtyItems) => {
		let countItems = 0
		const lengthArr = arr.length
		const resultArr = []
		const splitter = (arr) => {
			if (countItems >= lengthArr) {
				return
			}
			resultArr.push(arr.slice(countItems, countItems + qtyItems))
			countItems = countItems + qtyItems
			splitter(arr)
		}
		splitter(arr)
		return resultArr
	}

	useEffect(() => {
		setItemsArrSplitter(arraySplitter(items, 10))
	}, [items])

	const handleSubmit = async (values,
		{
			setErrors,
			resetForm
		}) => {
		const formDate = {
			username: values.username,
			phone: values.phone,
			city: values.city,
			address: values.address,
			comment_message: values.comment_message,
			items: items,
			shop_id: shop?._id,
			shop_email: shop.email,
			shop_name: shop.shop_name,
		}
		try {
			if (items.length <= 10) {
				const {data} = await postBasketFormClient(formDate)
				dispatch(resetBasket())
				// toast(data?.message)
				setReqMessage(data?.message)
				resetForm()
				setTimeout(() => onHide(), 2500)
			} else {
				const dataReq = []
				for (let i = 0; i < itemsArrSplitter.length; i++) {
					const {data} = await postBasketFormClient({
						...formDate,
						items: itemsArrSplitter[i]
					})
					dataReq.push(data)
				}
				dispatch(resetBasket())
				// toast(dataReq[0]?.message)
				setReqMessage(dataReq[0]?.message)
				resetForm()
				setTimeout(() => onHide(), 2500)
			}
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
			size={reqMessage ? 'lg' : 'sm'}
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
											<FormattedMessage id='phone' />
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
											<FormattedMessage id='name' />
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