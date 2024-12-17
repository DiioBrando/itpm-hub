import {AxiosResponse} from "axios";
import {IUser} from "../../../../entities/models/IUser.ts";
import $api from "../../api.ts";

export default class GetAllUsers {
    static async  getAll(): Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>('/get-all');
    }

    static async getMany(idArray: string[]): Promise<AxiosResponse<IUser[]>> {
        const ids = idArray.join(',');
        return $api.get<IUser[]>(`/get-many?id=${ids}`);
    }
}

