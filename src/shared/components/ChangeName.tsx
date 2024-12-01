import {Input} from "./Input.tsx";
import {Button} from "./Button.tsx";
import {AcceptSvg} from "../../../public/icons/AcceptSvg.tsx";
import {CancelSvg} from "../../../public/icons/CancelSvg.tsx";
import {ChangeEvent, useState} from "react";

export const ChangeName = ({name}: { name: string }) => {
    const [isOpen, setOpen] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>(name);

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
        isOpen ?
            <div  className={'flex gap-1 items-center'}>
                <Input input={{
                    style: 'rounded-md bg-gray-200 w-full h-[32px] pr-2 pl-2',
                    value: inputValue,
                    onChangeInput: (e) => handleChange(e),
                }}/>
                <div>
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
                </div>
            </div>:
            <Button setting={{
                textValue: `${name}`,
                buttonStyle: 'w-full flex p-1 rounded-md',
                onClickButton: handleOpenInputChange,
            }}/>
    )
}