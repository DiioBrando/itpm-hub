import { FC } from 'react';
import { IChildren } from '../../../entities/models/IChildren.ts';

export default function NavItems({children}: FC<IChildren>) {
    return (
        <nav className={'w-full h-full flex justify-between items-center p-2'}>
            {children}
        </nav>
    )
}