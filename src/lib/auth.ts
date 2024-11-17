import { fetchApi, HttpMethod } from "./services/api";

export async function refreshAccessToken() {
	const refreshToken = localStorage.getItem("refresh_token");
	if (!refreshToken) return null;

	try {
		const response = await fetchApi("/refresh", HttpMethod.POST, { refresh_token: refreshToken });
		localStorage.setItem("access_token", response.access_token);
		return response.access_token;
	} catch (error) {
		console.error("Failed to refresh token", error);
		return null;
	}
}