export const apiBaseUrl =
	process.env.NODE_ENV === "development"
		? "http://185.25.117.182/api"
		// ? "http://localhost:8080/api/"
		: `${window.location.origin}/api/`

export const makeUrl = (urlSuff) => `${apiBaseUrl}/${urlSuff}`