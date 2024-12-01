import $api from "../../api.ts";
import {AxiosResponse} from "axios";
import {ITask} from "../../../../entities/models/ITask.ts";

export default class TasksService {
    static async addTask(_id: string, name: string): Promise<AxiosResponse<void>> {
         return $api.post('/task/add', { _id, name, });
    }

    static async deleteTask(_id: string, idColumn: string): Promise<AxiosResponse<void>> {
        return $api.delete(`/task/delete${_id}/${idColumn}`);
    }

    static async updateTask(_id: string, description: string, name: string): Promise<AxiosResponse<void>> {
        return $api.patch('/task/update', { _id, description, name });
    }

    static async getAll(): Promise<AxiosResponse<ITask[]>> {
        return $api.get('/task/get-all');
    }

    static async getOne(_id: string): Promise<AxiosResponse<ITask>> {
       return $api.get(`/task/get-one/${_id}`);
    }

    static async getMany(idArray: string[] | undefined): Promise<AxiosResponse<ITask[]>> {
        const id = idArray!.join(',');
       return $api.get(`/task/get-many?id=${id}`);
    }

    static async deleteMany(idArray: string[] | undefined): Promise<AxiosResponse<void>> {
        const id = idArray!.join(',');
        return $api.get(`/task/delete-many?id=${id}`);
    }
}