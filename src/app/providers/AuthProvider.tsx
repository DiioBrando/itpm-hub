import { IChildren } from '../../entities/models/IChildren.ts';
import { useUserStore } from '../../shared/storages/UserStore.ts';
import $api from '../../shared/api/api.ts';
import {FC, useEffect, useLayoutEffect, useState} from 'react';
import {Loader} from "../../shared/components/Loader.tsx";

export default function AuthProvider({ children }: FC<IChildren>) {
    const [isLoading, setLoading] = useState<boolean>(true);
    const checkAuth = useUserStore(state => state.checkAuth);

    useEffect(() => {
        const getToken = localStorage.getItem('token');

        if(getToken) {
            checkAuth().finally(() => {
                setLoading(false);
            });
        }
    }, [checkAuth]);

    useLayoutEffect(() => {
        const authInterceptor =  $api.interceptors.request.use((config) => {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        }, (error) => {
            return Promise.reject(error);
        });
        return () => {
            $api.interceptors.request.eject(authInterceptor);
        }
    }, []);

    useLayoutEffect(() => {
      const refreshInterceptor = $api.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;
                if (error.response.status === 401 && error.config && !originalRequest._isRetry) {
                    originalRequest._isRetry = true;
                    try {
                        const res = await $api.get('/refresh');
                        if (res.data.accessToken) {
                            originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
                            return $api.request(originalRequest);
                        }
                    } catch (refreshError) {
                        console.error('Ошибка обновления токена:', refreshError.status);
                    }
                }
                throw error;
            }
        );
        return () => {
            $api.interceptors.response.eject(refreshInterceptor);
        }
    }, []);

    if(isLoading && localStorage.getItem('token')) {
        return <div><Loader /></div>;
    }

    return children;
}