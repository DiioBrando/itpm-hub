import { Button } from '../shared/components/Button.tsx';
import { PlusSvg } from '../../public/icons/PlusSvg.tsx';
import { useParams } from 'react-router-dom';
import {useUserStore} from "../shared/storages/UserStore.ts";
import {IProjects} from "../entities/models/IProjects.ts";
import {TasksColumn} from "../shared/components/kanban/TasksColumn.tsx";


export default function Project() {
    const { id: name } = useParams();
    const { projects, subProjects } = useUserStore((state) => state.user);
    const findProject = (currentProject: IProjects[], name: string ) => {
       return currentProject.find((item) => item.nameProject === name);
    }
    const currentProject: undefined | IProjects = name && projects.some((item) => item.nameProject === name)? findProject(projects, name): findProject(subProjects, name);

    return(
        <div className={'flex flex-col h-screen w-full p-2 gap-5'}>
            <ul className={'flex flex-col gap-2.5 border rounded-md h-fit p-2 w-full'}>
                <li className={'pl-2 pr-2 p-1'}>
                    <h1 className={'text-2xl first-letter:uppercase'}>{ currentProject?.nameProject }</h1>
                </li>
                <ul className={'flex gap-2.5 w-full text-center p-1'}>
                    <li className={'border rounded-md w-full overflow-hidden'}>
                        <Button setting={{
                            textValue: 'all column',
                            buttonStyle: 'w-full',
                        }} />
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
                {currentProject && <TasksColumn column={currentProject.kanbanTasks}/>}
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