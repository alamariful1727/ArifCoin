import { combineReducers } from 'redux';
import { authReducer } from './auth.reducer';
import messageReducer from './message.reducer';
import errorReducer from './error.reducer';
import arifCoinReducer from './arifCoin.reducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  arifCoin: arifCoinReducer,
  msg: messageReducer,
  error: errorReducer,
});
