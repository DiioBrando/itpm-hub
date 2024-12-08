import ProjectService from "../api/project/lib/ProjectService.ts";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "./Loader.tsx";
import { Button } from "./Button.tsx";
import { IUser } from "../../entities/models/IUser.ts";
import GetAllUsers from "../api/auth/lib/getAllUsers.ts";
import { useUserStore } from "../storages/UserStore.ts";

type PropsAddUserProject = {
    projectId: string;
    subscribersId: string[];
};

export const AddUserProject: FC<PropsAddUserProject> = ({ projectId, subscribersId }) => {
    const user = useUserStore((state) => state.user);
    const [isModalOpen, setIsOpenModal] = useState<boolean>(false);
    const [selectedUserId, setSelectedUserId] = useState<string>('');
    const [search, setSearch] = useState<string>('');
    const [users, setUsers] = useState<IUser[]>([]);

    const { data, isFetching, refetch } = useQuery({
        queryFn: async () => await GetAllUsers.getAll(),
        queryKey: [projectId, user.id],
    });

    const handleShowModal = () => {
        setIsOpenModal((prevState) => !prevState);
    };

    const handleInviteUserProject = async () => {
        if (selectedUserId.length > 0) {
            try {
                const res = await ProjectService.inviteProject(projectId, selectedUserId);
                if (res.status === 200) {
                    refetch(); // Обновляем список пользователей
                    setIsOpenModal(false); // Закрываем модальное окно
                }
            } catch (e) {
                console.error("Error inviting user:", e);
            }
        }
    };

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    useEffect(() => {
        if (data?.data) {
            // Исключаем добавленных пользователей
            const filteredUsers = data.data.filter(
                (user) => !subscribersId.includes(user.id)
            );

            // Применяем поиск
            const searchedUsers = filteredUsers.filter((user) =>
                user.email.toLowerCase().includes(search.toLowerCase())
            );

            setUsers(searchedUsers);
        }
    }, [data, search, subscribersId]);

    if (isFetching) {
        return <Loader />;
    }

    return (
        <div>
            <Button
                setting={{
                    textValue: "Добавить пользователя в проект",
                    onClickButton: handleShowModal,
                }}
            />
            {isModalOpen && (
                <div className={"fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"}>
                    <div className={"bg-white rounded-md p-5 w-1/3"}>
                        <h2 className={"text-lg mb-4"}>Выберите пользователя для добавления</h2>
                        <input
                            type="text"
                            className="border w-full p-2 rounded-md mb-4"
                            placeholder="Поиск по email"
                            value={search}
                            onChange={handleChangeInput}
                        />
                        <div className="max-h-40 overflow-y-auto border rounded-md p-2">
                            {users.length > 0 ? (
                                users.map((user) => (
                                    <div
                                        key={user.id}
                                        className={`p-2 rounded-md cursor-pointer ${
                                            selectedUserId === user.id ? "bg-blue-200" : ""
                                        }`}
                                        onClick={() => setSelectedUserId(user.id)}
                                    >
                                        {user.email}
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500">Пользователи не найдены</p>
                            )}
                        </div>
                        <div className={"flex gap-2 justify-end mt-4"}>
                            <Button
                                setting={{
                                    textValue: "Отмена",
                                    buttonStyle: "border rounded-md px-4 py-2",
                                    onClickButton: handleShowModal,
                                }}
                            />
                            <Button
                                setting={{
                                    textValue: "Добавить",
                                    buttonStyle: "bg-blue-500 text-white rounded-md px-4 py-2",
                                    onClickButton: handleInviteUserProject,
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
