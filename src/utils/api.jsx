import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;

const api = axios.create({
<<<<<<< HEAD
  baseURL: '/api',
=======
  baseURL: 'api',
>>>>>>> SearchPage
  params: {
    service: API_KEY,
  },
  headers: {Accept: 'application/xml'},
});

<<<<<<< HEAD
export default api; 
=======
export default api;
>>>>>>> SearchPage
