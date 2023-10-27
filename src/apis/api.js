import axios from 'axios';

export const serverApi = axios.create({
  // baseURL: 'http://selq.store/api',
  baseURL: 'http://localhost:8000/api',
  withCredentials: true,
});
