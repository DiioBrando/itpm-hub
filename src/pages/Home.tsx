import {ProjectAction} from "../shared/components/ProjectAction.tsx";
import {CreateProjectPanel} from "../shared/components/CreateProjectPanel.tsx";
import {DeleteProjectPanel} from "../shared/components/DeleteProjectPanel.tsx";

export default function Home() {
    return (
        <div className={'flex w-full h-full gap-2.5 p-4 max-h-[750px]'}>
            <ProjectAction textButton={'создать проект'} styleButton={'border bg-green-500 hover:bg-green-200 rounded-md w-full h-full'} styleDropDown={'h-full max-h-[800px] max-w-[1450px] top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-5 flex-row'}>
                <CreateProjectPanel />
            </ProjectAction>
            <ProjectAction textButton={'удалить проекты'} styleButton={'border bg-red-500 hover:bg-red-200 rounded-md w-full h-full'} styleDropDown={'h-full max-h-[800px] max-w-[1450px] top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-5 flex-row'}>
                <DeleteProjectPanel />
            </ProjectAction>
        </div>
    );
}