import { AxiosResponse } from 'axios';
import { IProjects } from '../../../../entities/models/IProjects.ts';
import $api from "../../api.ts";

export default class ProjectService {
    static async createProject(nameProject: string, budgetProject: string, descriptionProject: string, formattedDates: string): Promise<AxiosResponse<IProjects>> {
        return $api.post('/project', { nameProject, descriptionProject, budgetProject, formattedDates });
    }

    static async deleteProject(id: string): Promise<AxiosResponse<void>> {
        return $api.delete(`/project/${id}`);
    }

    static async updateProject(id: string, updatedData: Partial<IProjects>): Promise<AxiosResponse<void>> {
        return $api.patch(`/project/${id}`, updatedData);
    }

    static async getOne(name: string): Promise<AxiosResponse<IProjects>> {
        return $api.get<IProjects>(`/project/${name}`);
    }

    static async getAll(): Promise<AxiosResponse<IProjects[]>> {
        return $api.get<IProjects[]>('/projects');
    }

    static async getMany(idArray: string[] | undefined): Promise<AxiosResponse<IProjects[]>> {
        const ids = idArray?.join(',') || '';
        return $api.get<IProjects[]>(`/projects?ids=${ids}`);
    }

    static async deleteMany(idArray: string[] | undefined): Promise<AxiosResponse<void>> {
        const ids = idArray?.join(',') || '';
        return $api.delete(`/projects?id=${ids}`);
    }

    static async inviteProject(id: string, userId: string): Promise<AxiosResponse<void>> {
        return $api.post(`/project/invite/${id}/${userId}`);
    }

    static async kickProject(id: string, userId: string): Promise<AxiosResponse<void>> {
        return $api.delete(`/project/kick/${id}/${userId}`);
    }

    static async downloadProjectReport(projectId: string): Promise<void> {
            const response = await $api.get(`/project/report/${projectId}`, {
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));

            return url
    }


}
