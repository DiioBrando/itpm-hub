import { create } from 'zustand';
import { IUserStore } from '../../entities/models/IUserStore.ts';
import { IAuthResponse } from '../../entities/models/IAuth.ts';
import AuthService from '../../features/auth/lib/AuthService.ts';
import { IUser } from '../../entities/models/IUser.ts';
import axios from 'axios';

export const useUserStore = create<IUserStore>((set) => ({
    user: {} as IUser,
    isAuth: false,

    login: async (email: string, password: string) => {
        try {
            const response = await AuthService.login(email, password);
            localStorage.setItem('token', response.data.accessToken);
            set({ user: response.data.user, isAuth: true });
        } catch (e) {
            console.log(e);
        }
    },
    registration: async (login: string, email: string, password: string) => {
        try {
            const response = await AuthService.registration(login, email, password);
            localStorage.setItem('token', response.data.accessToken);
            set({ user: response.data.user, isAuth: true });
        } catch (e) {
            console.log(e);
        }
    },

    logout: async () => {
        try {
            await AuthService.logout();
            localStorage.removeItem('token');
        } catch (e) {
            console.log(e);
        } finally {
            set({ isAuth: false, user: {} as IUser });
        }
    },

    checkAuth: async () => {
        try {
            const response = await axios.get<IAuthResponse>(
                `${import.meta.env.VITE_BACKEND_URL}/api/refresh`,
                { withCredentials: true },
            );
            localStorage.setItem('token', response.data.accessToken);
            set({ isAuth: true, user: response.data.user });
        } catch (e) {
            console.log(e.status);
        }
    },
}));