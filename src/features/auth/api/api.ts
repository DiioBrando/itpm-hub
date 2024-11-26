import axios from 'axios';
import { IAuthResponse } from '../../../entities/models/IAuth.ts';

const $api = axios.create({
    withCredentials: true,
    baseURL: import.meta.env.VITE_BACKEND_URL + '/api',
});

$api.interceptors.request.use(async (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});

$api.interceptors.request.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response.status === 401 &&
            error.config &&
            !error.config._isRetry
        ) {
            originalRequest._isRetry = true;
            try {
                const response = await axios.get<IAuthResponse>(
                    `${import.meta.env.VITE_BACKEND_URL}/api/refresh`,
                    { withCredentials: true },
                );
                localStorage.setItem('token', response.data.accessToken);
                return $api.request(originalRequest);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (e) {
                console.log('No auth');
            }
        }
        throw error;
    },
);

export default $api;
