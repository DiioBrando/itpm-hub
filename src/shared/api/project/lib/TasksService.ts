import $api from "../../api.ts";
import { AxiosResponse } from "axios";
import { ITask } from "../../../../entities/models/ITask.ts";

export default class TasksService {
    static async addTask(_id: string, name: string, description: string, startDate: string): Promise<AxiosResponse<void>> {
        return $api.post('/tasks', { _id, name, startDate, description });
    }

    static async deleteTask(_id: string, idColumn: string): Promise<AxiosResponse<void>> {
        return $api.delete(`/tasks/${_id}/${idColumn}`);
    }

    static async updateTask(_id: string, description: string, name: string, idTasksColumn: string): Promise<AxiosResponse<void>> {
        return $api.patch(`/tasks/${_id}`, { description, name, idTasksColumn });
    }

    static async moveTask(_id: string, idColumn: string): Promise<AxiosResponse<void>> {
        return $api.patch(`/tasks/move/${_id}`, { idColumn });
    }

    static async getAll(): Promise<AxiosResponse<ITask[]>> {
        return $api.get('/tasks');
    }

    static async getOne(_id: string): Promise<AxiosResponse<ITask>> {
        return $api.get(`/tasks/${_id}`);
    }

    static async getMany(idArray: string[] | undefined): Promise<AxiosResponse<ITask[]>> {
        const id = idArray!.join(',');
        return $api.get(`/tasks/many?id=${id}`);
    }

    static async deleteMany(idArray: string[] | undefined): Promise<AxiosResponse<void>> {
        const id = idArray!.join(',');
        return $api.delete(`/tasks?id=${id}`);
    }
}
