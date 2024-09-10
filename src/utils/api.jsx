import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

<<<<<<< HEAD
const Api = axios.create({
    baseURL: 'http://www.kopis.or.kr/openApi/restful/pblprfr',
=======
const api = axios.create({
    baseURL: '/api',
>>>>>>> develop
    params: {
        service: API_KEY
    },
    headers: { Accept: 'application/xml' }


})

<<<<<<< HEAD
export default Api;
=======





export default api;
>>>>>>> develop
