import $api from "../../api.ts";
import {AxiosResponse} from "axios";
import {ITasksColumn} from "../../../../entities/models/ITasksColumn.ts";

export default class TasksColumnService {
    static async addTasksColumn(name: string): Promise<AxiosResponse<ITasksColumn[]>> {
        return $api.post('/column', {name});
    }

    static async deleteTasksColumn(id: string): Promise<AxiosResponse<void>> {
        return $api.delete(`/column/${id}`);
    }

    static async updateTasksColumn(_id: string, name: string): Promise<AxiosResponse<void>> {
        return $api.patch(`/column/${_id}`, {name});
    }

    static async getOne(_id: string): Promise<AxiosResponse<ITasksColumn>> {
        return $api.get(`/column/${_id}`);
    }

    static async getAll(): Promise<AxiosResponse<ITasksColumn[]>> {
        return $api.get('/columns');
    }

    static async getMany(idArray: string[]): Promise<AxiosResponse<ITasksColumn[]>> {
        const id = idArray.join(',');
        return $api.get('/columns/batch', {
            params: {id}
        });
    }

    static async deleteMany(idArray: string[]): Promise<AxiosResponse<void>> {
        const id = idArray.join(',');
        return $api.delete('/columns/batch', {
            params: {id}
        });
    }
}
