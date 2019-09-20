import { GET_CHAIN, CHAIN_LOADING } from '../actions/types';

const initialState = {
  blockchain: [],
  loading: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CHAIN:
      return {
        ...state,
        blockchain: action.payload.blockchain,
        loading: false,
      };
    case CHAIN_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
