import React, { useState } from 'react'
import {
	Button,
	Form,
	Modal
} from "react-bootstrap"
import { Formik } from "formik"
import { getBasketFormSchema } from "../../utils/validation/yupUpdateUser"
import { usePostBasketFormClientMutation } from "../../redux/services/categoriesApi";
import LoaderForButton from "../Loader/LoaderForButton";
import {
	useDispatch,
	useSelector
} from "react-redux";
import { resetBasket } from "../../redux/slices/categoriesSlice";

const ModalFormToOrder = ({
	show,
	onHide,
	items
}) => {
	const [form, setForm] = useState({})
	const {shop} = useSelector(state => state.categories)
	const [postBasketFormClient, {isLoading: isPostBasketFormClientLoading}] = usePostBasketFormClientMutation()
	const dispatch = useDispatch()
	const formDateUpdateHandler = (opt) => {
		setForm({...form, ...opt})
	}
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
			shop_email: shop.email
		}
		try {
			const {data} = await postBasketFormClient(formDate)
			console.log(data)
			dispatch(resetBasket())
			resetForm()
			onHide()
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
			size='sm'
		>
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
								{isPostBasketFormClientLoading ? <LoaderForButton/> : 'Save Changes'}
							</Button>
						</Modal.Footer>
					</Form>
				)}
			</Formik>
		</Modal>
	)
}

export default ModalFormToOrder