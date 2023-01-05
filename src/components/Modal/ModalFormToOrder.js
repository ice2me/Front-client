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
import LoaderForButton from "../Loader/LoaderForButton"
import {
	useDispatch,
	useSelector
} from "react-redux"
import { resetBasket } from "../../redux/slices/categoriesSlice"
import { toast } from "react-toastify"

const ModalFormToOrder = ({
	show,
	onHide,
	items
}) => {
	const [form, setForm] = useState({})
	const [reqMessage, setReqMessage] = useState('')
	const [itemsArrSplitter, setItemsArrSplitter] = useState([])
	const {shop} = useSelector(state => state.categories)
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
			items: items,
			shop_id: shop?._id,
			shop_email: shop.email,
			shop_name: shop.shop_name
		}
		try {
			if (items.length <= 10) {
				const {data} = await postBasketFormClient(formDate)
				dispatch(resetBasket())
				toast(data?.message)
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
				toast(dataReq[0]?.message)
				setReqMessage(dataReq[0]?.message)
				resetForm()
				setTimeout(() => onHide(), 2500)
			}
		} catch (e) {
			console.log(e)
			resetForm()
		}
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
							username: ''
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
										To Order Form
									</Modal.Title>
								</Modal.Header>
								<Modal.Body>
									<Form.Group
										className="mb-3"
										controlId="exampleForm.ControlInput1"
									>
										<Form.Label>
											Phone
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
										controlId="exampleForm.ControlInput1"
									>
										<Form.Label>
											Name
										</Form.Label>
										<Form.Control
											type="text"
											className={`pe-5  ${touched.username ? "is-touch " : ""} ${
												errors.username && touched.username ? " is-invalid" : ""
											} registrationShop-form_input`}
											placeholder="Your Name"
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
								</Modal.Body>
								<Modal.Footer>
									<Button
										variant="secondary"
										onClick={onHide}
									>
										Close
									</Button>
									<Button
										variant="primary"
										type='submit'
										disabled={(!isValid && dirty) || isPostBasketFormClientLoading}
									>
										{isPostBasketFormClientLoading ? <LoaderForButton /> : 'Save Changes'}
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