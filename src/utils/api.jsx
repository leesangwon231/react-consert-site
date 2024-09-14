import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;
const API = window.location.hostname === 'localhost' ? '/api' : '/proxy';
const api = axios.create({
  // baseURL: '/api',
  baseURL: API,
  params: {
    service: API_KEY,
  },
  headers: {Accept: 'application/xml'},
});

export default api;
