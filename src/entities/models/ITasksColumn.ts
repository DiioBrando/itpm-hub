import { ITask } from './ITask.ts';

export interface ITasksColumn {
    _id: string;
    nameTasksColumn: string;
    timestamp: string;
    tasks: ITask[];
}


export interface TasksColumnProps {
    columnArrayId: string[] | undefined;
}