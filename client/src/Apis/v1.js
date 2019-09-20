import axios from 'axios';

export default axios.create({
  baseURL: 'http://127.0.0.1:4040/api/v1/',
});
export const arifCoin = axios.create({
  baseURL: 'http://127.0.0.1:4040/api/v1/arifcoin/',
});
