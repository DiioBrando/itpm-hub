import { AxiosResponse } from 'axios';

import { IProjects } from '../../../entities/models/IProjects.ts';
import $api from "../../auth/api/api.ts";

export default class ProjectService {
    static async createProject(nameProject: string): Promise<AxiosResponse<void>> {
        return $api.post('/project/create', { nameProject });
    }
    static async deleteProject(id: string): Promise<AxiosResponse<void>> {
        return $api.delete(`/project/delete/${id}`);
    }
    static async updateProject(id: string): Promise<AxiosResponse<void>> {
        return $api.patch(`/project/update/${id}`);
    }
    static async getOne(id: string): Promise<AxiosResponse<IProjects>> {
        return $api.get<IProjects>(`/project/get-one/${id}`);
    }
    static async getAll(): Promise<AxiosResponse<IProjects[]>> {
        return $api.get<IProjects[]>('/project/get-all', );
    }
    static async getMany(idArray: string[]): Promise<AxiosResponse<IProjects[]>> {
        const id = idArray.join(',');
        return $api.get<IProjects[]>(`/project/get-many?id=${id}`);
    }
    static async deleteMany(idArray: string[]): Promise<AxiosResponse<void>> {
        const id = idArray.join(',');
        return $api.delete(`/project/delete-many?id=${id}`);
    }
    static async inviteProject(id: string, userid: string): Promise<AxiosResponse<void>> {
        return $api.post(`/project/invite-project/${id}/${userid}`);
    }
    static async kickProject(id: string, userid: string): Promise<AxiosResponse<void>> {
        return $api.delete(`/project/invite-project/${id}/${userid}`);
    }
}