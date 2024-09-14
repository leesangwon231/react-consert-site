import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;

const api = axios.create({
  // baseURL: '/api',
  baseURL: 'http://www.kopis.or.kr/openApi/restful/',
  method: 'GET',
  params: {
    service: API_KEY,
  },
  headers: {Accept: 'application/xml'},
});

export default api;
