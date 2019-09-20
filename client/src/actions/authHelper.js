import v1 from "./../Apis/v1";
import decode from "jwt-decode";

export const signIn = async (email, password, history) => {
	const body = {
		email: email,
		password: password
	};
	try {
		let headers = {
			Accept: "application/json",
			"Content-Type": "application/json"
		};
		const response = await v1.post("account/login", body, headers);
		const token = response.data.token;
		setToken(token);
		history.replace("/");
	} catch (error) {
		console.log(error);
	}
};
// Checks if there is a saved token and it's still valid
export const isLogged = () => {
	// const token = getToken();
	// return !!token && isTokenValid(token);
	return localStorage.hasOwnProperty("token");
};
// check a token is valid or not
export const isTokenValid = token => {
	try {
		const decoded = decode(token);
		if (decoded.exp < Date.now()) {
			return false;
		} else return true;
	} catch (err) {
		console.log("expired check failed! Line 42: AuthService.js");
		return false;
	}
};
// Saves user token to localStorage
export const setToken = token => {
	localStorage.setItem("token", token);
};

// Retrieves the user token from localStorage
export const getToken = () => {
	return localStorage.getItem("token");
};

// Clear user token and profile data from localStorage
export const logout = () => {
	localStorage.removeItem("token");
};
