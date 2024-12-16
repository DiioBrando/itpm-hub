import {Button} from '../Button.tsx';
import {AboutOfTask} from './AboutOfTask.tsx';
import {ITasks} from '../../../entities/models/ITask.ts';
import {ChangeEvent, FC, useState} from 'react';
import {useQuery} from "@tanstack/react-query";
import TasksService from "../../api/project/lib/TasksService.ts";
import {Loader} from "../Loader.tsx";
import {PlusSvg} from "../../../../public/icons/PlusSvg.tsx";
import {Input} from "../Input.tsx";
import {DeleteSvg} from "../../../../public/icons/DeleteSvg.tsx";

export const Tasks: FC<ITasks> = ({tasksId, idTasksColumn, taskColumn}) => {
    const {data: tasks, isFetching, refetch} = useQuery({
        queryFn: () => TasksService.getMany(tasksId),
        queryKey: [tasksId],
        enabled: tasksId.length > 0,
    });
    const date = new Date();
    const tomorrowDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
    const initialDateValue = tomorrowDate.toLocaleDateString();

    const [expirationDate, setExpirationDate] = useState<string>(initialDateValue);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [isAboutTask, setAboutTask] = useState(false);

    const handleMoveTask = async (_id: string, newColumnId: string) => {
            await TasksService.moveTask(_id, newColumnId);
            refetch();
    };


    const handleChangeOpenModal = () => {
        setIsModalOpen(prevState => !prevState);
    };

    const handleDeleteTask = (_id: string) => {
        TasksService.deleteTask(_id, idTasksColumn).then((res) => {
            if (res.status === 200) {
                refetch();
            }
        });
    }

    const handleAddTask = () => {
        if (taskName.length > 0) {
            TasksService.addTask(idTasksColumn, taskName, taskDescription, expirationDate).then((res) => {
                if (res.status === 200) {
                    setIsModalOpen(false);
                    refetch();
                }
            });
        }
    }

    const handleChangeDate = (e: ChangeEvent<HTMLInputElement>) => {
        const dateValue = e.target.value;
        setExpirationDate(dateValue);
    };



    if (isFetching) {
        return <Loader/>;
    }


    return (
        <>
            {
                tasks && tasks?.data.map((itemTask) => (
                    <div key={itemTask._id}>
                        <div className={'w-full flex relative'}>
                            <div className={'w-full h-[50px] flex relative'}>
                                <Button setting={{
                                    buttonStyle: 'flex w-full rounded-md bg-gray-200',
                                    textValue: `${itemTask.nameTask.length >= 18? itemTask.nameTask.slice(0, -3) + '...': itemTask.nameTask}`,
                                    textStyle: 'flex items-center pr-2 pl-2 w-full max-w-[170px] text-start',
                                    onClickButton: () => setAboutTask(prevState => !prevState),
                                }}/>
                                <Button setting={{
                                    image: {
                                        svgComponent: {
                                            image: <DeleteSvg/>,
                                            style: 'h-[25px] w-[25px] p-1'
                                        },
                                    },
                                    buttonStyle: 'bg-black-200 absolute right-[12px] top-[12px] rounded-md',
                                    onClickButton: () => handleDeleteTask(itemTask._id),
                                }}/>
                            </div>
                        </div>
                        {isAboutTask && (
                            <div className={'fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'}>
                                <AboutOfTask aboutTask={itemTask} refetch={() => refetch()} setAboutTask={setAboutTask} moveTask={handleMoveTask} taskColumn={taskColumn}/>
                            </div>)}
                    </div>
                ))
            }
            <Button setting={{
                image: {
                    svgComponent: {
                        image: <PlusSvg/>,
                        style: 'w-[25px] h-[25px]',
                    },
                },
                buttonStyle: 'rounded-md p-1',
                onClickButton: handleChangeOpenModal,
            }}/>
            {isModalOpen && (
                <div className={'fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'}>
                    <div className={'bg-white rounded-md p-5 w-1/3'}>
                        <h2 className={'text-lg mb-4'}>Добавить задачу</h2>
                        <Input
                            input={{
                                type: 'text',
                                value: taskName,
                                onChangeInput: (e) => setTaskName(e.target.value),
                                style: 'border w-full p-2 rounded-md mb-4',
                                placeholder: 'Имя задачи',
                            }}/>
                        <Input
                            input={{
                                type: 'text',
                                value: taskDescription,
                                onChangeInput: (e) => setTaskDescription(e.target.value),
                                style: 'border w-full p-2 rounded-md mb-4',
                                placeholder: 'Описание задачи',
                            }}/>
                        <Input
                            input={{
                                type: 'date',
                                value: expirationDate,
                                onChangeInput: handleChangeDate,
                                style: 'border w-full p-2 rounded-md mb-4',
                            }}/>
                        <div className={'flex gap-2 justify-end'}>
                            <Button setting={{
                                textValue: 'Отмена',
                                buttonStyle: 'border rounded-md px-4 py-2',
                                onClickButton: handleChangeOpenModal,
                            }}/>
                            <Button setting={{
                                textValue: 'Добавить',
                                buttonStyle: 'bg-blue-500 text-white rounded-md px-4 py-2',
                                onClickButton: handleAddTask,
                            }}/>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
};
