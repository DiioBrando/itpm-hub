import { FC, useState } from 'react';
import { IAboutOfTask } from '../../../entities/models/ITask.ts';
import TasksService from "../../api/project/lib/TasksService.ts";
import { Button } from "../Button.tsx";

export const AboutOfTask: FC<IAboutOfTask> = ({ aboutTask, refetch, setAboutTask, moveTask, taskColumn }) => {
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState(aboutTask.nameTask);
    const [description, setDescription] = useState(aboutTask.description);
    const [selectedColumn, setSelectedColumn] = useState<string>(''); // Состояние для выбранного столбца

    const date = new Date(String(aboutTask.startDate)).toLocaleDateString();

    const handleEdit = () => {
        setEditing(true);
    };

    const handleSave = async () => {
        try {
            await TasksService.updateTask(aboutTask._id, description, name, aboutTask.idTasksColumn).then((res) => {
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

    const handleMove = () => {
        if (selectedColumn) {
            moveTask(aboutTask._id, selectedColumn);
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
            <div className="mt-4">
                <p>Выберите столбец для перемещения:</p>
                <select
                    value={selectedColumn}
                    onChange={(e) => setSelectedColumn(e.target.value)}
                    className="border p-2 rounded-md w-full"
                >
                    <option value="" disabled>Выберите столбец</option>
                    {taskColumn && taskColumn.data.map((item) => (
                        <option key={item._id} value={item._id}>
                            {item.nameTasksColumn}
                        </option>
                    ))}
                </select>
                <Button
                    setting={{
                        textValue: 'Переместить',
                        buttonStyle: 'bg-green-500 text-white rounded-md px-4 py-2 mt-2',
                        onClickButton: handleMove,
                    }}
                />
            </div>
        </div>
    );
};
