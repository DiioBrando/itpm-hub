import {Dropdown} from './Dropdown.tsx';
import {createRef, FC, useState} from 'react';
import {Button} from "./Button.tsx";
import {IProjectAction} from "../../entities/models/IProjectAction.ts";
import {useClickOutSide} from "../hooks/useClickOutSide.tsx";
import {CancelSvg} from "../../../public/icons/CancelSvg.tsx";

export const ProjectAction: FC<IProjectAction> = ({textButton, styleButton, children, styleDropDown}) => {
    const [isOpen, setOpen] = useState<boolean>(false);
    const refDiv = createRef<HTMLDivElement>(null);
    useClickOutSide(refDiv, () => setTimeout(() => setOpen(false), 300));
    const handleChange = () => {
        setOpen(prevState => !prevState);
    }


    return (
        <div ref={refDiv} className={'w-full h-full flex items-center'}>
            <Button setting={{
                textValue: `${textButton}`,
                textStyle: 'text-black',
                buttonStyle: `w-full h-full ${styleButton}`,
                onClickButton: handleChange,
            }}/>
            <Dropdown isOpen={isOpen} style={styleDropDown} refObj={refDiv}>
                <>
                    {children}
                    <div className={'w-fit max-w-max max-h-max h-fit absolute right-1.5 flex'}>
                        <Button setting={{
                            onClickButton: handleChange,
                            image: {
                                svgComponent: {
                                    image: <CancelSvg/>,
                                    style: 'w-[25px] h-[25px] p-1',
                                },
                            },
                            buttonStyle: 'rounded-md',
                        }}/>
                    </div>
                </>
            </Dropdown>
        </div>
    )
}