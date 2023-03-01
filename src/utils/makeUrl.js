export const apiBaseUrl =
	process.env.NODE_ENV === "development"
		? "https://client.theke.com.ua/api/"
		// ? "http://localhost:8080/api/"
		: `${window.location.origin}/api/`

export const makeUrl = (urlSuff) => `${apiBaseUrl}/${urlSuff}`