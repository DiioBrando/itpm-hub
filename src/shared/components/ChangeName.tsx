import {Input} from "./Input.tsx";
import {Button} from "./Button.tsx";
import {AcceptSvg} from "../../../public/icons/AcceptSvg.tsx";
import {CancelSvg} from "../../../public/icons/CancelSvg.tsx";
import {ChangeEvent, FC, useState} from "react";
import {IChangeName} from "../../entities/models/IChangeName.ts";
import {useQuery} from "@tanstack/react-query";
import {PencilSvg} from "../../../public/icons/PencilSvg.tsx";

export const ChangeName: FC<IChangeName> = ({_id, name, updateNameFn}) => {
    const [isOpen, setOpen] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>(name);

    const {refetch} = useQuery({
        queryKey: ['name'],
        queryFn: () => updateNameFn(_id, inputValue),
        enabled: false,
    });

    const handleOpenInputChange = () => {
        setOpen(!isOpen);
        if (!isOpen) {
            setInputValue(name);
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = () => {
        if (name !== inputValue && inputValue.length > 0) {
            refetch().then(() => {
                setInputValue(inputValue);
                setOpen(false);
            });
        }
    };

    return (
        isOpen ? (
            <div className={'flex gap-1 items-center'}>
                <Input
                    input={{
                        style: 'rounded-md bg-gray-200 w-full h-[32px] pr-2 pl-2',
                        value: inputValue,
                        onChangeInput: handleChange,
                    }}
                />
                <div className={'flex gap-1'}>
                    <Button
                        setting={{
                            image: {
                                svgComponent: {
                                    image: <AcceptSvg/>,
                                    style: 'w-[20px] h-[20px]',
                                },
                            },
                            buttonStyle: 'rounded-md p-2',
                            textStyle: 'flex items-center pr-2 pl-2',
                            onClickButton: handleSubmit,
                        }}
                    />
                    <Button
                        setting={{
                            image: {
                                svgComponent: {
                                    image: <CancelSvg/>,
                                    style: 'w-[20px] h-[20px]',
                                },
                            },
                            buttonStyle: 'rounded-md p-2',
                            textStyle: 'flex items-center pr-2 pl-2',
                            onClickButton: handleOpenInputChange,
                        }}
                    />
                </div>
            </div>
        ) : (
            <div className={'flex justify-between items-center'}>
                <h2 className={'p-1 w-full'}>{inputValue}</h2>
                <Button
                    setting={{
                        image: {
                            svgComponent: {
                                image: <PencilSvg/>,
                                style: 'h-[20px] w-[20px] rotate-45',
                            },
                        },
                        buttonStyle: 'w-full max-w-max flex p-1 rounded-md rotate-90',
                        onClickButton: handleOpenInputChange,
                    }}
                />
            </div>
        )
    );
};
