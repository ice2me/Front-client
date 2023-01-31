export const apiBaseUrl =
	process.env.NODE_ENV === "development"
		? "http://client.theke.com.ua/api"
		// ? "http://localhost:8080/"
		// : `${window.location.origin}/api/`
		: `${window.location.origin}/`

export const makeUrl = (urlSuff) => `${apiBaseUrl}/${urlSuff}`