import { Link } from 'react-router-dom';
import { ArrowBar } from '../../../../public/icons/ArrowBar.tsx';
import { Button } from '../Button.tsx';
import { ProfileIcon } from '../../../../public/icons/ProfileIcon.tsx';
import { useSidebar } from '../../storages/Sidebar.ts';
import { useEffect, useState, createRef } from 'react';
import { NavItems } from './NavItems.tsx';
import { Dropdown } from '../Dropdown.tsx';
import { useUserStore } from '../../storages/UserStore.ts';
import { ILogOut } from '../../../../public/icons/ILogOut.tsx';
import { useClickOutSide } from '../../hooks/useClickOutSide.tsx';
import { HomeSvg } from '../../../../public/icons/HomeSvg.tsx';
import ProjectService from '../../api/project/lib/ProjectService.ts';
import { useQuery } from '@tanstack/react-query';
import {CancelSvg} from "../../../../public/icons/CancelSvg.tsx";

export const Navbar = () => {
    const handleChangeToggle = useSidebar((state) => state.handleChangeToggle);
    const toggleStyle = useSidebar((state) => state.style);
    const logOut = useUserStore((state) => state.logout);
    const user = useUserStore((state) => state.user);
    const [isOpenProfile, setOpenProfile] = useState(false);
    const [isOpenModal, setOpenModal] = useState(false);
    const [search, setSearch] = useState<string>('');
    const [selectedProjectId, setSelectedProjectId] = useState<string[]>([]);
    const projects = useUserStore((state) => state.user.projects);
    const subProjects = useUserStore((state) => state.user.subProjects);

    const { data, isFetching } = useQuery({
        queryFn: () => ProjectService.getMany(projects.concat(subProjects)),
        queryKey: ['projectsData'],
        enabled: projects.concat(subProjects).length > 0,
    });

    const filterProjects = (projectName: string, projects: Array<any>) => {
        if (!projectName) return projects;
        return projects.filter((item) =>
            item.nameProject.toLowerCase().includes(projectName.toLowerCase())
        );
    };


    const ref = createRef<HTMLDivElement>(null);
    useClickOutSide(ref, () => setTimeout(() => setOpenProfile(false), 300));

    const handleChangeOpen = () => {
        setOpenProfile((prevState) => !prevState);
    };

    const handleChangeOpenModal = () => {
        setOpenModal((prevState) => !prevState);
    };

    const handleGetSelectedProject = async () => {
        if (selectedProjectId.length > 0) {
            await ProjectService.downloadSelectedProjectsReports(selectedProjectId).then((res) => {
                if (res) {
                    window.open(res);
                }
            });
        }
    };

    const handleAddProjectId = (id: string) => {
        setSelectedProjectId((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
    };

    const handleGetAllProjectReport = async () => {
        await ProjectService.downloadAllProjectsReports().then((res) => {
            if (res) {
                window.open(res);
            }
        });
    };

    useEffect(() => {
        useSidebar.getState?.().loadStateLocalStorage();
    }, []);

    return (
        <header className="h-[65px]">
            <NavItems>
                <div className="flex gap-1 items-center">
                    <Button
                        setting={{
                            image: {
                                svgComponent: {
                                    image: <ArrowBar />,
                                    style: 'w-[30px] h-[30px]',
                                },
                            },
                            buttonStyle: `p-1 hover:rounded-md ${toggleStyle}`,
                            onClickButton: handleChangeToggle,
                        }}
                    />
                    <Link to="/" className="w-[30px]">
                        <Button
                            setting={{
                                image: {
                                    svgComponent: {
                                        image: <HomeSvg />,
                                        style: 'w-[40px] h-[40px] p-1',
                                    },
                                },
                                buttonStyle: 'rounded-md flex items-center',
                            }}
                        />
                    </Link>
                </div>
                <div className={'flex items-center gap-2.5'}>
                    <div>
                        <Button
                            setting={{
                                textValue: 'Отчёты',
                                onClickButton: handleChangeOpenModal,
                                buttonStyle: 'rounded-md p-1',
                            }}
                        />
                        {isOpenModal && (
                            <div className={"fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"}>
                                <div className={'bg-white rounded-md p-5 max-w-[450px] min-w-[380] min-h-max'}>
                                   <div className={'flex flex-row-reverse justify-between items-center mb-4'}>
                                       <Button setting={{
                                           image: {
                                               svgComponent: {
                                                   image: <CancelSvg/>,
                                                   style: 'w-[25px] h-[25px]',
                                               },
                                           },
                                           onClickButton: handleChangeOpenModal,
                                       }}/>
                                       <h1 className="text-lg">Выберите проекты</h1>
                                   </div>
                                    <input
                                        type="text"
                                        placeholder="Ищите проекты здесь..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="w-full border rounded-md p-2 mb-4"
                                    />
                                    <div className="max-h-60 overflow-y-auto border rounded-md p-2 mb-4">
                                        {filterProjects(search, data?.data || []).map((item) => (
                                            <label key={item._id} className="flex items-center gap-2 mb-2">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedProjectId.includes(item._id)}
                                                    onChange={() => handleAddProjectId(item._id)}
                                                    className="form-checkbox h-5 w-5 text-blue-600"
                                                />
                                                {item.nameProject}
                                            </label>
                                        ))}
                                    </div>
                                    <div className={'flex flex-col gap-2.5'}>
                                        <Button setting={{
                                            textValue: 'получить отчёт по выбранным проектам',
                                            buttonStyle: 'bg-blue-500 text-white rounded-md px-4 py-2',
                                            onClickButton: handleGetSelectedProject,
                                        }}/>
                                        <Button
                                            setting={{
                                                textValue: 'получить по всем доступным проектам отчёт',
                                                onClickButton: handleGetAllProjectReport,
                                                buttonStyle: 'bg-blue-500 text-white rounded-md px-4 py-2',
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                    <div ref={ref} className="flex relative items-center">
                        <Button
                            setting={{
                                image: {
                                    svgComponent: {
                                        image: <ProfileIcon />,
                                        style: 'w-[40px] h-[40px] flex justify-center rounded-full',
                                    },
                                },
                                onClickButton: handleChangeOpen,
                                buttonStyle: 'rounded-full bg-blue-200',
                            }}
                        />
                        <Dropdown refObj={ref} isOpen={isOpenProfile} style="text-md flex-col">
                            <>
                                <div className="p-1">{user.email}</div>
                                <div className="p-1 hover:bg-gray-300 rounded-md">
                                    <Link to="/profile">
                                        <Button
                                            setting={{
                                                textValue: 'profile',
                                                buttonStyle: 'hover:bg-0 flex flex-row-reverse items-center',
                                                image: {
                                                    svgComponent: {
                                                        image: <ProfileIcon />,
                                                        style: 'w-[20px] h-[20px]',
                                                    },
                                                },
                                            }}
                                        />
                                    </Link>
                                </div>
                                <div className="p-1 hover:bg-gray-300 rounded-md">
                                    <Link to="/login">
                                        <Button
                                            setting={{
                                                textValue: 'log out',
                                                onClickButton: logOut,
                                                buttonStyle: 'rounded-md flex flex-row-reverse items-center',
                                                image: {
                                                    svgComponent: {
                                                        image: <ILogOut />,
                                                        style: 'w-[20px] h-[20px] p-1',
                                                    },
                                                },
                                            }}
                                        />
                                    </Link>
                                </div>
                            </>
                        </Dropdown>
                    </div>
                </div>
            </NavItems>
        </header>
    );
};
