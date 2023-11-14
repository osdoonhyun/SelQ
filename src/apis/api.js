import axios from 'axios';

export const serverApi = axios.create({
  // baseURL: process.env.REACT_APP_PROD_BASE_URL,
  baseURL: process.env.REACT_APP_DEV_BASE_URL,
  withCredentials: true,
});
