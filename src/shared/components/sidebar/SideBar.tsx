import {SideItems} from './SideItems.tsx';
import {useSidebar} from '../../storages/Sidebar.ts';
import {Details} from '../Details.tsx';
import {useQuery} from '@tanstack/react-query';
import ProjectService from '../../../features/project/lib/ProjectService.ts';
import {useUserStore} from '../../storages/UserStore.ts';
import {Loader} from '../Loader.tsx';


export const SideBar = () => {
    const isOpenSidebar = useSidebar((state) => state.isOpen);
    const myProjects = useUserStore(state => state.user);
    const {data: mainProjects, isFetching: isFetchingMain} = useQuery({
        queryFn: () => ProjectService.getMany(myProjects.projects),
        queryKey: ['mainProjects'],
    });
    const {data: subProjects, isFetching: isFetchingSub} = useQuery({
        queryFn: () => ProjectService.getMany(myProjects.projects),
        queryKey: ['mainProjects'],
    });
    return (
        isOpenSidebar ? <aside className={'w-full max-w-[200px] p-2'}>
            <SideItems>
                {
                    (!mainProjects && isFetchingMain) && (!subProjects && isFetchingSub) ?
                        <div className={'flex items-center justify-center'}>
                            <Loader/>
                        </div> :
                        <div className={'p-1 pr-2 pl-2 m-1'}>
                            {(mainProjects && !isFetchingMain) &&
                                <Details summaryText={'My Projects'} dataProjects={mainProjects.data}/>}
                            {(subProjects && !isFetchingSub) &&
                                <Details summaryText={'Sub Projects'} dataProjects={subProjects.data}/>}
                        </div>
                }
            </SideItems>
        </aside> : null
    );
}