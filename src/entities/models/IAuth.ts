import {IUser} from "./IUser.ts";

export interface IReg extends ILogin {
    login: string;
}

export interface ILogin {
    email: string;
    password: string;
}

export interface IAuthResponse {
    accessToken: string;
    refreshToken: string;
    user: IUser;
}