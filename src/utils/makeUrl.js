export const apiBaseUrl =
	process.env.NODE_ENV === "development"
		? "http://backend:8080/"
		// ? "http://localhost:8080/"
		// : `${window.location.origin}/api/`
		: `${window.location.origin}/`

export const makeUrl = (urlSuff) => `${apiBaseUrl}/${urlSuff}`