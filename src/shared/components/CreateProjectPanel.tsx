import { Input } from "./Input.tsx";
import { Button } from "./Button.tsx";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProjectService from "../api/project/lib/ProjectService.ts";

export const CreateProjectPanel = () => {
    const [name, setName] = useState('');
    const [cost, setCost] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleChange = (setter: (value: string) => void) => (e: ChangeEvent<HTMLInputElement>) => {
        setter(e.target.value);
    };

    const convertDateToTimestamp = (dateString: string) => {
        const [year, month, day] = dateString.split('-').map(Number);
        const date = new Date(year, month - 1, day);
        return date.getTime();
    };

    const handleSubmit = () => {
        if (name.trim() && cost.trim() && startDate.trim() && endDate.trim()) {
            try {
                const startDateTimestamp = convertDateToTimestamp(startDate);
                const endDateTimestamp = convertDateToTimestamp(endDate);

                const formattedDates = `${startDateTimestamp} - ${endDateTimestamp}`;
                ProjectService.createProject(name, cost, description, formattedDates).then((res) => {
                    if (res.status === 200) {
                        setName('');
                        setCost('');
                        setStartDate('');
                        setEndDate('');
                        setDescription('');
                        navigate(`/project/${res.data?.nameProject}`);
                    }
                });
            } catch (e) {
                console.error(e);
                setName('');
                setCost('');
                setStartDate('');
                setEndDate('');
                setDescription('');
            }
        }
    };

    return (
        <div className={'flex max-h-max w-full flex-col gap-2 justify-center p-4'}>
            <div>
                <h1>Допустимые символы: латинские буквы (a-z, A-Z), цифры (0-9) и дефис (-). Все остальные символы будут удалены(кириллица не поддерживается в имени проекта).</h1>
                <p>Укажите имя (это поле обязательное)</p>
                <Input input={{
                    placeholder: 'Имя проекта',
                    style: 'w-full h-[30px] border-black border p-2 rounded-md',
                    value: name,
                    onChangeInput: handleChange(setName),
                }}/>
            </div>
            <div>
                <p>Укажите бюджет/стоимость проекта (это поле обязательно, так же стоимость нужно указать в долларах США, расчет следовательно тоже будет в них)</p>
                <Input input={{
                    placeholder: 'Стоимость/Бюджет проекта',
                    style: 'w-full h-[30px] border-black border p-2 rounded-md',
                    value: cost,
                    onChangeInput: handleChange(setCost),
                    type: 'number',
                }} />
            </div>
            <div>
                <p>Укажите дату начала проекта(обязательное поле)</p>
                <Input input={{
                    placeholder: 'Дата начала проекта',
                    style: 'w-full h-[30px] border-black border p-2 rounded-md',
                    value: startDate,
                    onChangeInput: handleChange(setStartDate),
                    type: 'date',
                }} />
            </div>
            <div>
                <p>Укажите дату окончания проекта(обязательное поле)</p>
                <Input input={{
                    placeholder: 'Дата окончания проекта',
                    style: 'w-full h-[30px] border-black border p-2 rounded-md',
                    value: endDate,
                    onChangeInput: handleChange(setEndDate),
                    type: 'date',
                }} />
            </div>
            <p>Укажите описание проекта (это поле не обязательное)</p>
            <Input input={{
                placeholder: 'Описание проекта',
                style: 'w-full h-[60px] border-black border p-2 rounded-md',
                value: description,
                onChangeInput: handleChange(setDescription),
                type: 'text',
            }} />
            <Button setting={{
                textValue: 'Submit',
                buttonStyle: `rounded-md p-2 ${name && cost && startDate && endDate ? '' : 'cursor-not-allowed bg-gray-500 hover:bg-gray-500'}`,
                disabled: !(name && cost && startDate && endDate),
                onClickButton: handleSubmit,
            }} />
        </div>
    );
};
