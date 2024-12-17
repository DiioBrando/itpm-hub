import {ChangeEvent, FC, useEffect, useState} from 'react';
import { IAboutOfTask } from '../../../entities/models/ITask.ts';
import TasksService from "../../api/project/lib/TasksService.ts";
import { Button } from "../Button.tsx";
import GetAllUsers from "../../api/auth/lib/getAllUsers.ts";
import {useQuery} from "@tanstack/react-query";
import {IUser} from "../../../entities/models/IUser.ts";
import {DeleteSvg} from "../../../../public/icons/DeleteSvg.tsx";

export const AboutOfTask: FC<IAboutOfTask> = ({ aboutTask, refetch, setAboutTask, moveTask, taskColumn, idSubscribers }) => {
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState(aboutTask.nameTask);
    const [description, setDescription] = useState(aboutTask.description);
    const [selectedColumn, setSelectedColumn] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [search, setSearch] = useState<string>('');
    const [users, setUsers] = useState<IUser[]>([]);
    const [selectedUserId, setSelectedUserId] = useState<string>('');

    const date = new Date(Number(aboutTask.startDate)).toLocaleDateString();

    const { data: Subusers, refetch: refetchUsers } = useQuery({
        queryFn: () => GetAllUsers.getMany(idSubscribers!),
        queryKey: ['idSubUsers'],
        enabled: idSubscribers?.length > 0,
    });
    const { data: executor, isFetching: isFetchingExecutor, refetch: refetchExecutor } = useQuery({
        queryFn: () => GetAllUsers.getMany(aboutTask.executor),
        queryKey: ['executor'],
        enabled: aboutTask.executor.length > 0,
    });

    useEffect(() => {
        if (Subusers?.data) {
            const filteredUsers = Subusers.data.filter(
                (user) => user.email.toLowerCase().includes(search.toLowerCase())
            );
            setUsers(filteredUsers);
        }
    }, [search, Subusers]);

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

    const handleAddSubscriber = async () => {
        if (selectedUserId) {
            try {
                await TasksService.addUserToTask(aboutTask._id, selectedUserId);
                refetch();
                setIsModalOpen(false);
            } catch (error) {
                console.error('Failed to add subscriber', error);
            }
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
                    <>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border p-1 rounded-md w-full"
                    />
                        <Button
                            setting={{
                                textValue: 'Добавить подписчика',
                                buttonStyle: 'ml-2 bg-green-500 text-white px-3 py-1 rounded',
                                onClickButton: () => setIsModalOpen(true),
                            }}
                        />
                        {isModalOpen && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                                <div className="bg-white rounded-md p-5 w-1/3">
                                    <h2 className="text-lg mb-4">Добавить пользователя по email</h2>
                                    <input
                                        type="text"
                                        placeholder="Поиск по email"
                                        className="border p-2 w-full rounded-md"
                                        value={search}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                                    />
                                    <div className="max-h-40 overflow-y-auto mt-2">
                                        {users.length > 0 ? (
                                            users.map((user) => (
                                                <div
                                                    key={user.id}
                                                    onClick={() => setSelectedUserId(user.id)}
                                                    className={`p-2 rounded-md cursor-pointer ${
                                                        selectedUserId === user.id ? "bg-blue-200" : ""
                                                    }`}
                                                >
                                                    {user.email}
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-gray-500">Пользователи не найдены</p>
                                        )}
                                    </div>
                                    <div className="flex justify-end gap-2 mt-4">
                                        <Button setting={{ textValue: 'Отмена', onClickButton: () => setIsModalOpen(false) }} />
                                        <Button
                                            setting={{
                                                textValue: 'Добавить',
                                                onClickButton: handleAddSubscriber,
                                                buttonStyle: 'bg-blue-500 text-white px-3 py-1 rounded',
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <p>{aboutTask.description}</p>
                )}
            </div>
            <p className="mt-2 text-gray-600">Date: {date}</p>
            {aboutTask.changed && <p>Задача изменена</p>}
            <div className={'mb-4 mt-4'}>
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
            <div className={'mt-4 mb-4'}>
                {isFetchingExecutor? '':
                executor && executor.data.map(item => (
                    <div key={item.id} className={'flex gap-2.5'}>
                        <p>{item.email}</p>
                        <Button setting={{
                            image: {
                                svgComponent: {
                                    image: <DeleteSvg/>,
                                    style: 'w-[25px] h-[25px]',
                                },
                            },
                            onClickButton: () => TasksService.removeUserFromTask(aboutTask._id, item.id).then(() => {
                                refetchExecutor();
                                refetch();
                            }),
                        }}/>
                    </div>
                ))
                }
            </div>
        </div>
    );
};
