import {ChangeName} from "../ChangeName.tsx";
import {Tasks} from "./Tasks.tsx";
import TasksColumnService from "../../api/project/lib/TasksColumnService.ts";
import {useQuery} from "@tanstack/react-query";
import {FC} from "react";
import {TasksColumnProps} from "../../../entities/models/ITasksColumn.ts";
import {Loader} from "../Loader.tsx";

export const TasksColumn: FC<TasksColumnProps> = ({columnArrayId}) => {
    const { data, isFetching } = useQuery({
        queryFn: () => TasksColumnService.getMany(columnArrayId!),
        queryKey: ['id'],
        enabled: columnArrayId?.length > 0,
    });

    if(isFetching) {
        return <Loader />
    }

    return (
        data &&  data.data.map((itemColumn) => (
                <div key={itemColumn._id} className={'border w-full max-w-[250px] max-h-[350px] h-screen mr-1 ml-1 rounded-md p-2 overflow-x-hidden overflow-y-scroll flex flex-col gap-2'}>
                    <ChangeName _id={itemColumn._id} name={itemColumn.nameTasksColumn} updateNameFn={TasksColumnService.updateTasksColumn}/>
                    <Tasks tasks={itemColumn.tasks}/>
                </div>
            )
        )
    );
}