import {Input} from "./Input.tsx";
import {Button} from "./Button.tsx";
import {ChangeEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import ProjectService from "../api/project/lib/ProjectService.ts";

export const CreateProjectPanel = () => {
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate();
    const handleChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }
    const handleSubmit = () => {
        if (inputValue.length > 0) {
            try {
                ProjectService.createProject(inputValue).then((res) => {
                    if (res.status === 200) {
                        setInputValue('');
                        navigate(`/project/${res.data?.nameProject}`);
                    }
                });
            } catch (e) {
                setInputValue('');
            }
        }
    }

    return (
        <div className={'flex max-h-max w-full flex-col gap-2 justify-center p-4'}>
            <div>
                <h1>Allowed characters: Latin alphabet letters (a-z, A-Z), numbers (0-9), and hyphen (-). All other
                    characters will be removed.</h1>
            </div>
            <Input input={{
                placeholder: 'set name project',
                style: 'w-full h-[30px] border-black border p-2 rounded-md',
                value: inputValue,
                onChangeInput: handleChangeInputValue,
            }}/>
            <Button setting={{
                textValue: 'submit',
                buttonStyle: `rounded-md p-2 ${inputValue.length > 0 && inputValue ? '' : 'cursor-not-allowed bg-gray-500 hover:bg-gray-500'}`,
                disabled: inputValue.length < 0 && !inputValue,
                onClickButton: handleSubmit,
            }}/>
        </div>
    )
}