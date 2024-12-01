import { ITasksColumn } from './ITasksColumn.ts';
import { IUser } from './IUser.ts';

export interface IProjects {
    _id: string;
    nameProject: string;
    timestamp: string;
    userId: string;
    kanbanTasks: ITasksColumn[];
    subscribers: IUser[];
}