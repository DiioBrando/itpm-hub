import {IProjects} from "./IProjects.ts";

export interface IUser {
    id: string;
    login: string;
    email: string;
    roles: Array<string>;
    isActivated: boolean;
    projects: IProjects[];
    subProjects: IProjects[];
}