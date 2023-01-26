/* eslint-disable */
import * as yup from "yup"
import { PHONE_REGEXP} from "../constants"

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
	})
}