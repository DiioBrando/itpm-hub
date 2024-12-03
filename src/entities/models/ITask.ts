export interface ITask {
    _id: string;
    idTasksColumn: string;
    nameTask: string;
    description: string;
    changed: boolean;
    comments: string[];
    timestamp: string;
}

export interface ITasks {
    tasksId: string[];
}