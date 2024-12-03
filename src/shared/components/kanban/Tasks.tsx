import {Button} from '../Button.tsx';
import {MoreActionSvg} from '../../../../public/icons/MoreActionSvg.tsx';
import {AboutOfTask} from './AboutOfTask.tsx';
import {ITasks} from '../../../entities/models/ITask.ts';
import {FC} from 'react';
import {useQuery} from "@tanstack/react-query";
import TasksService from "../../api/project/lib/TasksService.ts";
import {Loader} from "../Loader.tsx";

export const Tasks: FC<ITasks> = ({tasksId}) => {
    const { data: tasks, isFetching} = useQuery({
        queryFn: () => TasksService.getMany(tasksId),
        queryKey: [tasksId],
    });

    if(isFetching) {
        return <Loader />;
    }
    console.log(tasks?.data);

    return (
        tasks && tasks.data.map((itemTask) => (
            <div key={itemTask._id} className={'w-full flex relative'}>
                <div className={'w-full h-[50px] flex relative'}>
                    <Button setting={{
                        buttonStyle: 'flex w-full rounded-md bg-gray-200',
                        textValue: `${itemTask.nameTask}`,
                        textStyle: 'flex items-center pr-2 pl-2 w-full',
                    }}/>
                    <Button setting={{
                        image: {
                            svgComponent: {
                                image: <MoreActionSvg/>,
                                style: 'h-[25px] w-[25px] p-1'
                            },
                        },
                        buttonStyle: 'bg-black-200 absolute right-[12px] top-[12px] rounded-md',
                    }}/>
                </div>
                <div className={'absolute hidden'}>
                    <AboutOfTask tasks={tasks} />
                </div>
            </div>
        ))
    )
}