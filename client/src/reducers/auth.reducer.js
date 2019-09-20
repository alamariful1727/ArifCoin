import {
	LOGIN_SUCCESS,
	LOGOUT,
	USER_LOADING,
	USER_LOADED,
	AUTH_ERROR,
	REGISTER_FAIL,
	LOGIN_FAIL,
	REGISTER_SUCCESS
} from "../actions/types";
import decode from "jwt-decode";

const initialState = {
	user: localStorage.hasOwnProperty("token")
		? decode(localStorage.getItem("token"))
		: {},
	isAuthenticate: localStorage.hasOwnProperty("token"),
	token: localStorage.hasOwnProperty("token")
		? localStorage.getItem("token")
		: "",
	isLoading: false
};

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case USER_LOADING:
			return {
				...state,
				isLoading: true
			};
		case USER_LOADED:
			return {
				...state,
				isAuthenticate: true,
				isLoading: false,
				user: action.payload
			};
		case LOGIN_SUCCESS:
			return {
				...state,
				token: action.payload.token,
				user: action.payload.user,
				isAuthenticate: true,
				isLoading: false
			};
		case REGISTER_SUCCESS:
			return {
				...state,
				token: action.payload.token,
				user: action.payload.user,
				isAuthenticate: true,
				isLoading: false
			};
		case AUTH_ERROR:
		case LOGIN_FAIL:
		case REGISTER_FAIL:
		case LOGOUT:
			localStorage.removeItem("token");
			return {
				...state,
				token: null,
				user: null,
				isAuthenticate: false,
				isLoading: false
			};

		default:
			return state;
	}
};
