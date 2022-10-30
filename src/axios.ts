import axios from 'axios';

const instance = axios.create({
  // process.env.REACT_APP_API_URL
  baseURL: 'http://localhost:4444',
});

instance.interceptors.request.use((config) => {
  // eslint-disable-next-line no-param-reassign
  // config.headers.Authorization = window.localStorage.getItem('token');
  return config;
});

export default instance;
