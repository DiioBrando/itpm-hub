import {useUserStore} from "../storages/UserStore.ts";
import {Details} from "./Details.tsx";

export const DeleteProjectPanel = () => {
    const projects = useUserStore(state => state.user);


    return (
        <div className={'flex max-h-max w-full flex-col gap-2 p-4'}>
            <div>
                <h2>Выберите или найдите проекты</h2>
            </div>
            <div className={'flex flex-col gap-2.5 rounded-md border border-blue-400 max-h-[700px] h-full p-2'}>
                <div className={'border border-blue-400 p-2 m-2 h-max overflow-y-scroll max-h-[300px] rounded-md'}>
                    <Details dataProjects={projects.projects} summaryText={'мои проекты'}/>
                </div>
                <div className={'border border-blue-400 p-2 m-2 h-max overflow-y-scroll max-h-[300px] rounded-md'}>
                    <Details dataProjects={projects.subProjects} summaryText={'подписанные проекты'}/>
                </div>
            </div>
        </div>
    )
}