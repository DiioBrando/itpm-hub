import { ChangeName } from "../ChangeName.tsx";
import { Tasks } from "./Tasks.tsx";
import TasksColumnService from "../../api/project/lib/TasksColumnService.ts";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FC } from "react";
import { TasksColumnProps } from "../../../entities/models/ITasksColumn.ts";
import { Loader } from "../Loader.tsx";
import {Button} from "../Button.tsx";
import {DeleteSvg} from "../../../../public/icons/DeleteSvg.tsx";

export const TasksColumn: FC<TasksColumnProps> = ({ columnArrayId, dataSubscribers }) => {
    const queryClient = useQueryClient();
    const { data, isFetching } = useQuery({
        queryFn: () => TasksColumnService.getMany(columnArrayId!),
        queryKey: ['columns', columnArrayId],
        enabled: columnArrayId?.length > 0,
    });
    const deleteColumnMutation = useMutation({
        mutationFn: async (id: string) => {
            await TasksColumnService.deleteTasksColumn(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['columns', columnArrayId]);
        }
    });


    if (isFetching) {
        return <Loader />;
    }

    return (
            data && data.data.map((itemColumn) => (
                <div key={itemColumn._id} className={'border w-full min-w-max max-w-[250px] max-h-[350px] h-screen mr-1 ml-1 rounded-md p-2 overflow-x-hidden overflow-y-scroll flex flex-col gap-2'}>
                    <div className={'flex'}>
                        <ChangeName _id={itemColumn._id} name={itemColumn.nameTasksColumn} updateNameFn={TasksColumnService.updateTasksColumn} />
                        <Button setting={{
                            buttonStyle: 'text-white p-1 max-w-max rounded-md',
                            onClickButton: () => deleteColumnMutation.mutate(itemColumn._id),
                            image: {
                                svgComponent: {
                                    image: <DeleteSvg />,
                                    style: 'w-[25px] h-[25px] p-1',
                                },
                            },
                        }}/>
                    </div>
                    <div className={'flex flex-col gap-2.5'}>
                    <Tasks tasksId={itemColumn.tasks} idTasksColumn={itemColumn._id} taskColumn={data} idSubscribers={dataSubscribers}/>
                    </div>
                </div>
            ))
    );
};
