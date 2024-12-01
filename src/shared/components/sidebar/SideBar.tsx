import {SideItems} from './SideItems.tsx';
import {useSidebar} from '../../storages/Sidebar.ts';
import {Details} from '../Details.tsx';
import {useUserStore} from '../../storages/UserStore.ts';

export const SideBar = () => {
    const isOpenSidebar = useSidebar((state) => state.isOpen);
    const projects = useUserStore(state => state.user);

    return (
        isOpenSidebar ? <aside className={'w-full max-w-[200px] p-2'}>
            <SideItems>
                <div className={'p-1 pr-2 pl-2 m-1'}>
                    <Details summaryText={'My Projects'} dataProjects={projects?.projects}/>
                    <Details summaryText={'Sub Projects'} dataProjects={projects?.subProjects}/>
                </div>
            </SideItems>
        </aside> : null
    );
}