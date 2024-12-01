import {FC} from 'react';
import {IColumn} from '../../../entities/models/ITasksColumn.ts';
import {ChangeName} from "../ChangeName.tsx";
import {Tasks} from "./Tasks.tsx";


export const TasksColumn: FC<IColumn> = ({column}) => {

    return (
        column.map((itemColumn) => (
            <div key={itemColumn.id} className={'border w-full max-w-[250px] max-h-[350px] h-screen mr-1 ml-1 rounded-md p-2 overflow-x-hidden overflow-y-scroll flex flex-col gap-2'}>
                <ChangeName name={itemColumn.nameTasksColumn}/>
                <Tasks tasks={itemColumn.tasks}/>
            </div>
        )));
}