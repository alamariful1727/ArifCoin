import { GET_CHAIN, CHAIN_LOADING } from './types';
import { arifCoin } from '../Apis/v1';
// import { returnErrors } from "./errorActions";
// import { tokenConfig } from './auth.action';

// get CHAIN
export const getChain = () => (dispatch, getState) => {
  dispatch(setChainLoading());
  arifCoin
    .get('/chain')
    .then(res => {
      dispatch({
        type: GET_CHAIN,
        payload: res.data,
      });
    })
    .catch(err => {
      console.log(err);
      // dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const setChainLoading = () => {
  return {
    type: CHAIN_LOADING,
  };
};
