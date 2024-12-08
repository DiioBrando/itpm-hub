import {AxiosResponse} from "axios";
import {IUser} from "../../../../entities/models/IUser.ts";
import $api from "../../api.ts";

export default class GetAllUsers {
    static async  getAll(): Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>('/get-all');
    }
}

