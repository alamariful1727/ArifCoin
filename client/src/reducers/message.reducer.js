import {
	GET_MESSAGES,
	MESSAGES_LOADING,
	NEW_MESSAGE,
	PUSH_MESSAGE,
	FCM_TOKEN,
	POST_CHAT
} from "../actions/types";

const initialState = {
	messages: [],
	loading: false,
	tokenSend: false,
	postChat: {}
};

export default function(state = initialState, action) {
	switch (action.type) {
		case NEW_MESSAGE:
			return {
				...state,
				messages: [action.payload, ...state.messages],
				loading: false
			};
		case PUSH_MESSAGE:
			return {
				...state,
				messages: [action.payload, ...state.messages],
				loading: false
			};
		case GET_MESSAGES:
			return {
				...state,
				messages: action.payload.messages,
				loading: false
			};
		case MESSAGES_LOADING:
			return {
				...state,
				loading: true
			};
		case FCM_TOKEN:
			return {
				...state,
				tokenSend: action.payload
			};
		case POST_CHAT:
			return {
				...state,
				postChat: action.payload
			};
		default:
			return state;
	}
}
