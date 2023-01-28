export const apiBaseUrl =
	process.env.NODE_ENV === "development"
		// ? "http://185.25.117.182/"
		? "http://localhost:8080/"
		// : `${window.location.origin}/api/`
		: `${window.location.origin}/`

export const makeUrl = (urlSuff) => `${apiBaseUrl}/${urlSuff}`