import {SideItems} from './SideItems.tsx';
import {Link} from 'react-router-dom';
import {useSidebar} from '../../storages/Sidebar.ts';
import {Details} from '../Details.tsx';

export const SideBar = () => {
    const isOpenSidebar = useSidebar((state) => state.isOpen);

    return (
        isOpenSidebar ? <aside className={'w-full max-w-max'}>
            <SideItems>
                <div className={'p-1 pr-2 pl-2 m-1'}>
                    <Details summaryText={'My Projects'}>
                        <Link to={''}></Link>
                    </Details>
                    <Details summaryText={'All Projects'}>
                        <Link to={''}></Link>
                    </Details>
                </div>
            </SideItems>
        </aside> : ''
    );
}