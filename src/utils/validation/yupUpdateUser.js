/* eslint-disable */
import * as yup from "yup"
import {
	EMAIL_REGEXP,
	PHONE_REGEXP
} from "../constants"

export const getBasketFormSchema = () => {
	return yup.object().shape({
		username: yup
			.string()
			.required('Name is a required field')
			.min(3)
			.max(65),
		phone: yup
			.string()
			.trim()
			.required('Mobile is a required field')
			.matches(PHONE_REGEXP, 'Mobile number is not valid'),
		email: yup
			.string()
			.trim()
			.email('Email must be a valid email')
			.matches(EMAIL_REGEXP, 'Email must be a valid email'),
		city: yup
			.string(),
		address: yup
			.string(),
		comment_message: yup
			.string()
	})
}