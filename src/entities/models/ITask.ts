import {ITasksColumn} from "./ITasksColumn.ts";

export interface ITask {
    _id: string;
    idTasksColumn: string;
    nameTask: string;
    description: string;
    changed: boolean;
    comments: string[];
    timestamp: string;
    startDate: string;
    executor: string[];
}

export interface ITasks {
    tasksId: string[];
    idTasksColumn: string;
    taskColumn: ITasksColumn[];
    idSubscribers: string[] | undefined;
}

export interface IAboutOfTask {
    aboutTask: ITask;
    refetch: () => void;
    setAboutTask: (boolean: boolean) => void;
    moveTask: (_id: string, newColumnId: string) => void;
    taskColumn: ITasksColumn[];
    idSubscribers: string[] | undefined;
}