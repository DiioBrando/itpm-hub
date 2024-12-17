export interface ITasksColumn {
    _id: string;
    nameTasksColumn: string;
    timestamp: string;
    tasks: string[];
    typeColumn: string;
}


export interface TasksColumnProps {
    columnArrayId: string[] | undefined;
    dataSubscribers: string[] | undefined;
}