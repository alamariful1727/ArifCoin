import {
	GET_MESSAGES,
	MESSAGES_LOADING,
	NEW_MESSAGE,
	PUSH_MESSAGE,
	FCM_TOKEN,
	POST_CHAT
} from "./types";
import v1 from "../Apis/v1";
// import { returnErrors } from "./errorActions";
import { tokenConfig } from "./auth.action";

// get all messages
export const getMessages = () => (dispatch, getState) => {
	dispatch(setMessagesLoading());
	v1.get("/message", tokenConfig(getState))
		.then(res => {
			dispatch({
				type: GET_MESSAGES,
				payload: res.data
			});
		})
		.catch(err => {
			console.log(err);
			// dispatch(returnErrors(err.response.data, err.response.status));
		});
};

// new massage
export const newMessage = message => (dispatch, getState) => {
	v1.post("/message", message, tokenConfig(getState))
		.then(res => {
			dispatch({
				type: NEW_MESSAGE,
				payload: res.data.newMessage
			});
		})
		.catch(err => {
			console.log(err);
			// dispatch(returnErrors(err.response.data, err.response.status));
		});
};

// push message
export const pushMessage = message => dispatch => {
	dispatch({
		type: PUSH_MESSAGE,
		payload: message
	});
};
// send fcm token
export const sendFcmToken = message => (dispatch, getState) => {
	v1.post("/chats/init", message, tokenConfig(getState))
		// v1.post("/chats/init", message, tokenConfig(getState))
		.then(res => {
			dispatch({
				type: FCM_TOKEN,
				payload: true
			});
		})
		.catch(err => {
			console.log(err);
			// dispatch(returnErrors(err.response.data, err.response.status));
		});
};
// push message for 1v1
export const sendMessage1v1 = message => (dispatch, getState) => {
	v1.post("/chats", message, tokenConfig(getState))
		.then(res => {
			dispatch({
				type: POST_CHAT,
				payload: res.data
			});
		})
		.catch(err => {
			console.log(err);
			// dispatch(returnErrors(err.response.data, err.response.status));
		});
};

export const setMessagesLoading = () => {
	return {
		type: MESSAGES_LOADING
	};
};
