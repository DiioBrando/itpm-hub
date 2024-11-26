import {FC, useState} from 'react';
import { IDetails } from '../../entities/models/IDetails.ts';
import {Arrow} from "../../../public/icons/Arrow.tsx";
import {Link} from "react-router-dom";
import {Button} from "./Button.tsx";


export const Details: FC<IDetails> = ({ children, summaryText }) => {
    const [isOpen, setOpen] = useState({
        isOpen: false,
        rotateArrow: 'rotate-180',
    });
    const onToggleDetail = () => {
        const newStyle = isOpen.isOpen? '-rotate-90': 'rotate-180';
        setOpen({ isOpen: !isOpen.isOpen, rotateArrow: newStyle});
    }

    return (
        <details>
            <summary className={'list-none hover:bg-gray-300 max-w-max pr-2 pl-2 p-0 rounded cursor-pointer'}>
                    <Button setting={{
                        image: {
                            svgComponent: {
                                image: <Arrow/>,
                                style: `w-[20px] h-[20px] ${isOpen.rotateArrow}`
                            },
                        },
                        textValue: `${ summaryText }`,
                        buttonStyle: 'flex flex-row-reverse items-center',
                        onClickButton: onToggleDetail,
                    }}/>
            </summary>
            <ul>
                <li className={'hover:bg-gray-300 max-w-max pr-2 pl-2 p-0 rounded'}>
                    { children }
                </li>
                <li className={'hover:bg-gray-300 max-w-max pr-2 pl-2 p-0 rounded'}>
                    <Link to={'/my-projects'}>view all...</Link>
                </li>
            </ul>
        </details>
    )
}