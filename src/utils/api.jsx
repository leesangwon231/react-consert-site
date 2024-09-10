import axios from "axios";
const API_KEY = import.meta.env.VITE_API_KEY;

const api = axios.create({
    baseURL : 'http://kopis.or.kr/openApi/restful/pblprfr',
    headers:{
        accept : 'application/json',
        Authorization : `Bearer ${API_KEY}`
    }
})


axios.interceptors.request.use(function (config) {
    return config;
  }, function (error) {
    return Promise.reject(error);
  });


axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    return Promise.reject(error);
  });

export default api;