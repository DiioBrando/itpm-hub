import { FC, useState } from 'react';
import { IAboutOfTask } from '../../../entities/models/ITask.ts';
import TasksService from "../../api/project/lib/TasksService.ts";
import {Button} from "../Button.tsx";


export const AboutOfTask: FC<IAboutOfTask> = ({ aboutTask, refetch, setAboutTask }) => {
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState(aboutTask.nameTask);
    const [description, setDescription] = useState(aboutTask.description);

    const date = new Date(Number(aboutTask.timestamp)).toLocaleDateString();

    const handleEdit = () => {
        setEditing(true);
    };

    const handleSave = async () => {
        try {
            await TasksService.updateTask(aboutTask._id, description, name).then((res) => {
                if (res.status === 200) {
                    setEditing(false);
                    refetch();
                }
            });
        } catch (error) {
            console.error('Failed to update task', error);
        }
    };

    const handleDelete = async () => {
        try {
            await TasksService.deleteTask(aboutTask._id, aboutTask.idTasksColumn).then((res) => {
                if (res.status === 200) {
                    setEditing(false);
                    refetch();
                }
            });
        } catch (error) {
            console.error('Failed to delete task', error);
        }
    };

    return (
        <div className="rounded-md bg-gray-200 p-4 w-full max-w-1/2 shadow-lg">
            <div className="flex justify-between items-center">
                {editing ? (
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border p-1 rounded-md w-full mr-2"
                    />
                ) : (
                    <h2 className="text-lg font-semibold">{aboutTask.nameTask}</h2>
                )}
                <div className={'flex max-w-max min-w-max'}>
                    <Button
                        setting={{
                            buttonValue: editing ? 'Сохраниеть' : 'Редактировать',
                            onClickButton: editing ? handleSave : handleEdit,
                            buttonStyle: 'bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600',
                            textValue: editing ? 'Сохранить' : 'Редактировать',
                        }}
                    />
                    <Button
                        setting={{
                            buttonValue: 'Удалить',
                            onClickButton: handleDelete,
                            buttonStyle: 'bg-red-500 text-white px-3 py-1 ml-2 rounded-md hover:bg-red-600',
                            textValue: 'Удалить',
                        }}
                    />
                    <Button setting={{
                        textValue: 'Закрыть',
                        buttonStyle: 'bg-gray-500 text-white px-3 py-1 ml-2 rounded-md transition',
                        onClickButton: () => setAboutTask(false),
                    }}/>
                </div>
            </div>
            <div className="mt-2">
                {editing ? (
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border p-1 rounded-md w-full"
                    />
                ) : (
                    <p>{aboutTask.description}</p>
                )}
            </div>
            <p className="mt-2 text-gray-600">Date: {date}</p>
            {aboutTask.changed && <p>Задача изменена</p>}
        </div>
    );
};
