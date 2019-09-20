import { combineReducers } from "redux";
import { authReducer } from "./auth.reducer";
import messageReducer from "./message.reducer";
import errorReducer from "./error.reducer";

export const rootReducer = combineReducers({
	auth: authReducer,
	msg: messageReducer,
	error: errorReducer
});
