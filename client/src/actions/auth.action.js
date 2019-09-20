import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT,
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
} from './types';
import v1 from '../Apis/v1';
import { returnErrors } from './errorActions';

// login
export const signInUser = user => async dispatch => {
  try {
    let headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    const response = await v1.post('account/login', user, headers);
    const token = response.data.user.token;
    // set the token on localStorage
    localStorage.setItem('token', token);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { token, user: response.data.user },
    });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// register
export const registerUser = user => async dispatch => {
  try {
    let headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    const response = await v1.post('account/signup', user, headers);
    const token = response.data.user.token;
    user = response.data.user;
    // set the token on localStorage
    localStorage.setItem('token', token);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: { token, user },
    });
  } catch (err) {
    // dispatch(returnErrors(err.response.data, err.response.status));
    console.log(err);
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// logout
export const logoutUser = () => async dispatch => {
  try {
    const response = await v1.get('account/logout');
    if (response.data.status) {
      localStorage.removeItem('token');
    }
    dispatch({
      type: LOGOUT,
    });
  } catch (error) {
    dispatch({
      type: LOGOUT,
    });
  }
};

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
  if (!getState().auth.isAuthenticate) {
    return;
  }
  // User loading
  dispatch({ type: USER_LOADING });
  v1.get(`/account`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: USER_LOADED,
        payload: res.data.user,
      }),
    )
    .catch(err => {
      // dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

// Setup config/headers and token
export const tokenConfig = getState => {
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      'Content-type': 'application/json',
      Authorization: token,
    },
  };

  // If token, add to headers
  if (token) {
    config.headers['Authorization'] = token;
  }

  return config;
};
