import { Button } from '../shared/components/Button.tsx';
import { PlusSvg } from '../../public/icons/PlusSvg.tsx';
import { useParams } from 'react-router-dom';
import { TasksColumn } from "../shared/components/kanban/TasksColumn.tsx";
import { useQuery } from "@tanstack/react-query";
import ProjectService from "../shared/api/project/lib/ProjectService.ts";
import { Loader } from "../shared/components/Loader.tsx";
import TasksColumnService from "../shared/api/project/lib/TasksColumnService.ts";
import { useState } from 'react';
import { Input } from "../shared/components/Input.tsx";

export default function Project() {
    const { id } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newColumnName, setNewColumnName] = useState('');
    const [newColumnType, setNewColumnType] = useState('in-work');

    // Query to get project data
    const { data, isFetching, refetch } = useQuery({
        queryFn: async () => await ProjectService.getOne(id!),
        queryKey: [id],
        enabled: (id?.length > 0) && (id !== undefined),
    });

    const handleChangeOpenModal = () => {
        setIsModalOpen(prevState => !prevState);
    };

    const handleAddColumn = async () => {
        if (!newColumnName.trim()) return;

        await TasksColumnService.addTasksColumn(newColumnName, newColumnType, data?.data._id).then((res) => {
            if(res.status === 200) {
                setIsModalOpen(false);
                refetch();
            }
        });
    };

    const handleDeleteColumn = async (columnId: string) => {
            await TasksColumnService.deleteTasksColumn(columnId).then((res) => {
                if(res.status === 200) {
                    refetch();
                }
            });
    };

    const handleDeleteMultipleColumns = async (columnIds: string[]) => {
            await TasksColumnService.deleteMany(columnIds).then((res) => {
                if(res.status === 200) {
                    refetch();
                }
            });

    };

    if (isFetching) {
        return <Loader />;
    }

    const currentProject = data?.data;

    return (
        <div className={'flex flex-col h-screen w-full p-2 gap-5'}>
            <ul className={'flex flex-col gap-2.5 border rounded-md h-fit p-2 w-full'}>
                <li className={'pl-2 pr-2 p-1'}>
                    <h1 className={'text-2xl first-letter:uppercase'}>{currentProject?.nameProject}</h1>
                </li>
                <ul className={'flex gap-2.5 w-full text-center p-1'}>
                    <li className={'border rounded-md w-full overflow-hidden'}>
                        <Button setting={{
                            textValue: 'all column',
                            buttonStyle: 'w-full',
                        }} />
                    </li>
                    <li className={'border rounded-md w-full overflow-hidden'}>
                        <Button setting={{
                            textValue: 'all tasks',
                            buttonStyle: 'w-full',
                        }} />
                    </li>
                </ul>
            </ul>
            <div className={'w-full flex gap-1.5'}>
                <TasksColumn
                    columnArrayId={currentProject?.kanbanTasks}
                    onDeleteColumn={handleDeleteColumn}
                    onDeleteMultipleColumns={handleDeleteMultipleColumns}
                />
                <Button
                    setting={{
                        image: {
                            svgComponent: {
                                image: <PlusSvg />,
                                style: 'w-[50px] h-[50px]',
                            },
                        },
                        buttonStyle: 'rounded-md h-fit p-2',
                        onClickButton: handleChangeOpenModal,
                    }}
                />
            </div>
            {isModalOpen && (
                <div className={'fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'}>
                    <div className={'bg-white rounded-md p-5 w-1/3'}>
                        <h2 className={'text-lg mb-4'}>Add New Column</h2>
                        <Input
                            input={{
                                type: 'text',
                                value: newColumnName,
                                onChangeInput: (e) => setNewColumnName(e.target.value),
                                style: 'border w-full p-2 rounded-md mb-4',
                                placeholder: 'Column name',
                            }}/>
                        <select
                            value={newColumnType}
                            onChange={(e) => setNewColumnType(e.target.value)}
                            className={'border w-full p-2 rounded-md mb-4'}
                        >
                            <option value="in-work">In Work</option>
                            <option value="in-process">In Process</option>
                            <option value="completed">Completed</option>
                        </select>
                        <div className={'flex gap-2 justify-end'}>
                            <Button setting={{
                                textValue: 'Cancel',
                                buttonStyle: 'border rounded-md px-4 py-2',
                                onClickButton: handleChangeOpenModal,
                            }} />
                            <Button setting={{
                                textValue: 'Add',
                                buttonStyle: 'bg-blue-500 text-white rounded-md px-4 py-2',
                                onClickButton: handleAddColumn,
                            }} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
