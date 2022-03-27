import axios from "axios"
import { parseCookies } from "nookies"

const TIMEOUT = 1000 * 20 // 20 seconds

export function createAPI(baseURL, timeout = TIMEOUT, headers = {}) {

	const api: any = axios.create({ baseURL, timeout })

	api.interceptors.request.use((config: any) => {

		// If auth.token cookie is present,
		// automatically set it to Authorization header as Bearer token
		const { "auth.token": token } = parseCookies()
		if (token) config.headers.Authorization = `Bearer ${token}`

		Object.keys(headers).forEach((header: string) => {
			config.headers[header] = headers[header]
		})

		config.headers.Authorization = `Bearer ${"4a54a5ad-0de9-4bd0-9404-8724b7351ee1"}`

		console.log("Axios Authorization: " + config.headers.Authorization)
		return config
	})

	// Add a response interceptor
	api.interceptors.response.use(
		function (response: any) {
			// Any status code that lie within the range of 2xx cause this function to trigger
			// if (
			// 	!response.headers["content-type"].includes("application/json")
			// ) {
			// 	throw "invalid response type"
			// } else {
			// 	return response.data
			// }
			return response.data
		},
		function (error: any) {
			// Any status codes that falls outside the range of 2xx cause this function to trigger
			// Do something with response error

			if (error.response) {
				throw typeof error.response.data === "object"
					? "errors" in error.response.data
						? error.response.data.errors[0]
						: JSON.stringify(error.response.data)
					: error.response.data
			} else if (error.request) {
				throw "No response from server" // The request was made but no response was received
			} else {
				throw error.message // Something happened in setting up the request that triggered an Error
			}
		}
	)

	return api
}