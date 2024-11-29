import {Button} from '../Button.tsx';
import {MoreActionSvg} from '../../../../public/icons/MoreActionSvg.tsx';
import {Input} from "../Input.tsx";
import {AcceptSvg} from "../../../../public/icons/AcceptSvg.tsx";
import {CancelSvg} from "../../../../public/icons/CancelSvg.tsx";
import React, {ChangeEvent, useState} from "react";

export const TasksColumn = () => {
    const [isOpen, setOpen] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('');
    const handleOpenInputChange = () => {
        setOpen(!isOpen);

        if (!isOpen) {
            setInputValue('');
        }
    }
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    return (
        <ul className={'border w-full max-w-[250px] max-h-[350px] h-screen mr-1 ml-1 rounded-md p-2 overflow-x-hidden overflow-y-scroll flex flex-col gap-2'}>
            <li>
                {isOpen ?
                    <div className={'flex gap-1 items-center'}>
                        <Input input={{
                            style: 'rounded-md bg-gray-200 w-full h-[32px] pr-2 pl-2',
                            value: inputValue,
                            onChangeInput: (e) => handleChange(e),
                        }}/>
                        <Button setting={{
                            image: {
                                svgComponent: {
                                    image: <AcceptSvg/>,
                                    style: 'w-[20px] h-[20px]',
                                },
                            },
                            buttonStyle: 'rounded-md p-2',
                            textStyle: 'flex items-center pr-2 pl-2',
                        }}/>

                        <Button setting={{
                            image: {
                                svgComponent: {
                                    image: <CancelSvg/>,
                                    style: 'w-[20px] h-[20px]',
                                },
                            },
                            buttonStyle: 'rounded-md p-2',
                            textStyle: 'flex items-center pr-2 pl-2',
                            onClickButton: handleOpenInputChange,
                        }}/>
                    </div> :
                    <Button setting={{
                        textValue: 'Name',
                        buttonStyle: 'w-full flex p-1 rounded-md',
                        onClickButton: handleOpenInputChange,
                    }}/>
                }
            </li>
            <li className={'w-full h-[50px] flex relative'}>
                <Button setting={{
                    buttonStyle: 'flex w-full rounded-md bg-gray-200',
                    textValue: '123',
                    textStyle: 'flex items-center pr-2 pl-2',
                }}/>
                <Button setting={{
                    image: {
                        svgComponent: {
                            image: <MoreActionSvg/>,
                            style: 'h-[25px] w-[25px] p-1'
                        },
                    },
                    buttonStyle: 'bg-black-200 absolute right-[12px] top-[12px] rounded-md',
                }}/>
            </li>

        </ul>
    );
}