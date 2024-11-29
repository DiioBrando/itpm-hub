import { IUser } from './IUser.ts';

export interface IUserStore {
    user: IUser;
    isAuth: boolean;
    login: (email: string, password: string) => Promise<void>;
    registration: (
        login: string,
        email: string,
        password: string,
    ) => Promise<void>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
}