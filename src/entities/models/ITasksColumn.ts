import { ITask } from './ITask.ts';

export interface ITasksColumn {
    id: string;
    nameTasksColumn: string;
    timestamp: string;
    tasks: ITask[];
}


export interface IColumn {
    column: ITasksColumn[];
}