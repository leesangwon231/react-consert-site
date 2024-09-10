import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

const Api = axios.create({
    baseURL: '/api',
    params: {
        service: API_KEY
    },
    headers: { Accept: 'application/xml' }


})






export default Api;