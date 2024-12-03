import React, {FC, RefObject} from 'react';
import {IChildren} from "../../entities/models/IChildren.ts";

type IDropDown = {
    children: IChildren;
    isOpen: boolean;
    style: string;
    refObj: RefObject<HTMLDivElement>;
}

export const Dropdown: FC<IDropDown> = ({children, isOpen, style = '', refObj}) => {
    return (
        <div ref={refObj} className={`border border-black w-full min-w-max rounded-md p-2 z-50 bg-white absolute top-11 right-0 ${style} ${isOpen ? 'opacity-1 flex' : 'opacity-0 hidden'}`}>
            {children}
        </div>

    )
}