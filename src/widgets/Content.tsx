import { IChildren } from '../entities/models/IChildren.ts';
import { FC } from 'react';
import { Navbar } from '../shared/components/header/NavBar.tsx';
import { SideBar } from "../shared/components/sidebar/SideBar.tsx";


export const Content: FC<IChildren> = ({children}) => {
    return (
        <div>
            <Navbar/>
            <main className={'flex h-screen'}>
                <SideBar />
                { children }
            </main>
        </div>
    );
}