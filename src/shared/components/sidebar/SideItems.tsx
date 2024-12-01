import {FC} from "react";
import {IChildren} from "../../../entities/models/IChildren.ts";

export const SideItems: FC<IChildren> = ({ children }) => {
    return (
        <nav className={'w-full h-full flex flex-col p-2'}>
            {children}
        </nav>
    );
}