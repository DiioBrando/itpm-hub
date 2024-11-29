export interface ITask {
    id: string;
    idTasksColumn: string;
    nameTask: string;
    description: string;
    changed: boolean;
    comments: string[];
    timestamp: string;
}