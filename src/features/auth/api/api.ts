import axios from 'axios';

const $api = axios.create({
    withCredentials: true,
    baseURL: import.meta.env.VITE_BACKEND_URL + '/api',
    headers: {
        common: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        }
    },
});

export default $api;
