export interface IUser {
    id: string;
    login: string;
    email: string;
    roles: Array<string>;
    isActivated: boolean;
    projects: string[];
    subProjects: string[];
}