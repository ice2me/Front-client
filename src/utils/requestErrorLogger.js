import { isRejectedWithValue } from "@reduxjs/toolkit"
import { apiBaseUrl } from "./makeUrl"
import { URLS_PROCESSED_IN_COMPONENTS } from "./constants"


export const requestErrorLogger = () => (next) => (action) => {
	if (action && isRejectedWithValue(action)) {
		const responseUrl = action.meta.baseQueryMeta.response.url;
		let isNotificationNeeded = true;
		if (action.payload.status === 401) {
			isNotificationNeeded = false;
		} else {
			isNotificationNeeded = !(
				URLS_PROCESSED_IN_COMPONENTS.map((item) => apiBaseUrl + item).some(
					(url) =>
						url === responseUrl ||
						// for "/password/reset/confirm/"
						url === responseUrl.split("/", 7).join("/") + "/"
				)
			);
			return;
		}
		if (
			responseUrl !== apiBaseUrl + "/login/" &&
			action.payload.status === 502
		) {
			isNotificationNeeded = false
		}
	}
	return next(action)
}
