import {FC, ChangeEvent, useEffect, useState} from 'react';
import {IDetails} from '../../entities/models/IDetails.ts';
import {Arrow} from '../../../public/icons/Arrow.tsx';
import {Input} from './Input.tsx';
import {useQuery} from "@tanstack/react-query";
import ProjectService from "../api/project/lib/ProjectService.ts";
import {Loader} from "./Loader.tsx";
import {ProjectItem} from "./ProjectItem.tsx";
import {Button} from "./Button.tsx";

export const Details: FC<IDetails> = ({dataProjects, summaryText, children, styleDetails}) => {
    const {data, isFetching} = useQuery({
        queryFn: () => ProjectService.getMany(dataProjects),
        queryKey: [dataProjects],
        enabled: dataProjects?.length > 0,
    });

    const [projects, setProjects] = useState(data?.data || []);
    const [selectedProjects, setSelectedProjects] = useState<Set<string>>(new Set());
    const [search, setSearch] = useState<string>('');
    const [isOpen, setOpen] = useState({
        isOpen: false,
        rotateArrow: 'rotate-180',
    });
    const [selectMode, setSelectMode] = useState(false);

    const handleSelect = (projectId: string) => {
        setSelectedProjects((prev) => {
            const newSelectedProjects = new Set(prev);
            if (newSelectedProjects.has(projectId)) {
                newSelectedProjects.delete(projectId);
            } else {
                newSelectedProjects.add(projectId);
            }
            return newSelectedProjects;
        });
    };

    const handleDeleteSelected = () => {
        if([...selectedProjects].length > 0) {
        ProjectService.deleteMany([...selectedProjects]);
        setProjects(projects.filter(project => !selectedProjects.has(project._id)));
        setSelectedProjects(new Set());
        setSelectMode(false);
        }
    };

    const toggleSelectMode = () => {
        setSelectMode((prev) => !prev);
        setSelectedProjects(new Set());
    };

    const onToggleDetail = () => {
        const newStyle = isOpen.isOpen ? 'rotate-180' : '-rotate-90';
        setOpen({isOpen: !isOpen.isOpen, rotateArrow: newStyle});
    }

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    const filterProjects = (projectName, projects) => {
        if (!projectName) return projects;
        return projects.filter(item => item.nameProject.toLowerCase().includes(projectName.toLowerCase()));
    }

    useEffect(() => {
        const Debounce = setTimeout(() => {
            const filteredProjects = filterProjects(search, data?.data || []);
            setProjects(filteredProjects);
        }, 300);

        return () => clearTimeout(Debounce);
    }, [data, search]);

    if (isFetching) {
        return <Loader/>;
    }

    return (
        <details
            className={styleDetails?.details || 'text-black max-w-[160px] border-l-2 border-black hover:border-gray-400 pl-1'}
            onToggle={onToggleDetail}>
            <summary className={'list-none hover:bg-gray-300 max-w-max pr-2 pl-2 p-0 rounded cursor-pointer'}>
                <div className={styleDetails?.summary?.divStyle || 'flex items-center'}>
                    <span
                        className={styleDetails?.summary?.firstSpan || `w-[20px] h-[20px] ${isOpen.rotateArrow}`}><Arrow/></span>
                    <span className={styleDetails?.summary?.secondSpan}>{summaryText}</span>
                </div>
            </summary>
            <ul className={styleDetails?.ulStyle || 'flex flex-col gap-2'}>
                {(projects.length > 0) || (data?.data.length > 0) ? (
                    <li className={'p-1'}>
                        <Input input={{
                            onChangeInput: handleChangeInput,
                            value: search,
                            type: 'text',
                            placeholder: 'search here',
                            style: 'w-full max-w-max pr-2 pl-2',
                        }}/>
                    </li>
                ) : null}
                {
                    projects.length > 0 ? (
                           <>
                               {
                                   projects.map((item) => (
                                       <ProjectItem
                                           key={item._id}
                                           project={item}
                                           liStyle={styleDetails?.liStyle}
                                           onSelect={handleSelect}
                                           isSelected={selectedProjects.has(item._id)}
                                           selectMode={selectMode}
                                       />
                                   ))
                               }
                               <li className="p-1">
                                   {selectMode && <Button setting={{
                                       buttonStyle: 'rounded-md p-1',
                                       textValue: 'Delete Selected',
                                       onClickButton: handleDeleteSelected,
                                   }}/>}
                                   <Button setting={{
                                       buttonStyle: 'rounded-md p-1',
                                       textValue: selectMode ? 'Exit Select Mode' : 'Select Projects',
                                       onClickButton: toggleSelectMode,
                                   }}/>
                               </li>
                           </>
                    ) : (<li className={'w-full'}> Project not found or no projects</li>)
                }
                {children}
            </ul>
        </details>
    );
};
