import { AxiosResponse } from 'axios';
import $api from "../../api.ts";
import {IComment} from "../../../../entities/models/IComment.ts";

export default class CommentsService {
    static async addComment(content: string, postId: string): Promise<AxiosResponse<void>> {
        return $api.post('/comment', { content, postId });
    }

    static async deleteComment(id: string): Promise<AxiosResponse<void>> {
        return $api.delete(`/comment/${id}`);
    }

    static async updateComment(id: string, content: string): Promise<AxiosResponse<void>> {
        return $api.patch(`/comment/${id}`, { content });
    }

    static async getAllComments(): Promise<AxiosResponse<IComment[]>> {
        return $api.get<IComment[]>('/comments');
    }
    static async getManyComments(idArray: string[]): Promise<AxiosResponse<IComment[]>> {
        const id = idArray.join(',');
        return $api.get<IComment[]>(`/comments/batch?id=${id}`)
    }
}
