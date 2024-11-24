import {IChildren} from '../entities/models/IChildren.ts';
import {FC} from 'react';
import {Navbar} from '../shared/components/header/NavBar.tsx';
import {SideBar} from "../shared/components/sidebar/SideBar.tsx";


export const Content: FC<IChildren> = ({children}) => {
    return (
        <>
            <Navbar/>
            <main className={'w-full h-full'}>
                <SideBar />
                { children }
            </main>
        </>
    );
}