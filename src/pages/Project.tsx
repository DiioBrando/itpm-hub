import { Button } from '../shared/components/Button.tsx';
import { PlusSvg } from '../../public/icons/PlusSvg.tsx';
import { useParams } from 'react-router-dom';
import {TasksColumn} from "../shared/components/kanban/TasksColumn.tsx";
import {useQuery} from "@tanstack/react-query";
import ProjectService from "../shared/api/project/lib/ProjectService.ts";
import {Loader} from "../shared/components/Loader.tsx";


export default function Project() {
    const { id } = useParams();
    const { data, isFetching } = useQuery({
        queryFn: async () => await ProjectService.getOne(id!),
        queryKey: [id],
    });

    if(isFetching) {
        return <Loader/>
    }

    const currentProject = data?.data;


    return(
        <div className={'flex flex-col h-screen w-full p-2 gap-5'}>
            <ul className={'flex flex-col gap-2.5 border rounded-md h-fit p-2 w-full'}>
                <li className={'pl-2 pr-2 p-1'}>
                    <h1 className={'text-2xl first-letter:uppercase'}>{currentProject?.nameProject}</h1>
                </li>
                <ul className={'flex gap-2.5 w-full text-center p-1'}>
                    <li className={'border rounded-md w-full overflow-hidden'}>
                        <Button setting={{
                            textValue: 'all column',
                            buttonStyle: 'w-full',
                        }}/>
                    </li>
                    <li className={'border rounded-md w-full overflow-hidden'}>
                        <Button setting={{
                            textValue: 'all tasks',
                            buttonStyle: 'w-full',
                        }}/>
                    </li>
                </ul>
            </ul>
            <div className={'w-full flex gap-1.5'}>
                <TasksColumn columnArrayId={currentProject?.kanbanTasks}/>
                <Button setting={{
                    image: {
                        svgComponent: {
                            image: <PlusSvg/>,
                            style: 'w-[50px] h-[50px]',
                        },
                    },
                    buttonStyle: 'rounded-md h-fit p-2'
                }}/>
            </div>
        </div>
    )
}