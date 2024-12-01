import {ChangeEvent, FC, useEffect, useState} from 'react';
import {IDetails} from '../../entities/models/IDetails.ts';
import {Arrow} from '../../../public/icons/Arrow.tsx';
import {Link} from 'react-router-dom';
import {IProjects} from '../../entities/models/IProjects.ts';
import {Input} from './Input.tsx';

export const Details: FC<IDetails> = ({dataProjects, summaryText, children}) => {
    const [projects, setProjects] = useState<IProjects[]>(dataProjects || []);
    const [search, setSearch] = useState<string>('');
    const [isOpen, setOpen] = useState({
        isOpen: false,
        rotateArrow: 'rotate-180',
    });

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
            const filteredProjects = filterProjects(search, dataProjects || []);
            setProjects(filteredProjects);
        }, 300);

        return () => clearTimeout(Debounce);
    }, [dataProjects, search]);

    return (
        <details className={'text-black max-w-[160px] border-l-2 border-black hover:border-gray-400 pl-1'} onToggle={onToggleDetail}>
            <summary className={'list-none hover:bg-gray-300 max-w-max pr-2 pl-2 p-0 rounded cursor-pointer'}>
                <div className={'flex items-center'}>
                    <span className={`w-[20px] h-[20px] ${isOpen.rotateArrow}`}><Arrow/></span>
                    <span>{summaryText}</span>
                </div>
            </summary>
            <ul className={'flex flex-col gap-2'}>
                {
                    projects.length > 0? (
                        <li className={'p-1'}>
                            <Input input={{
                                onChangeInput: handleChangeInput,
                                value: search,
                                type: 'text',
                                placeholder: 'search here',
                                style: 'w-full max-w-max pr-2 pl-2',
                            }}/>
                        </li>
                    ) : null
                }
                {
                    projects.length > 0 ? (
                        projects.map((item) => (
                            <li className={'list-none hover:bg-gray-300 pr-2 pl-2 p-1 rounded cursor-pointer max-w-[150px] whitespace-nowrap'}
                                key={item._id}>
                                <Link to={{
                                    pathname: `/project/${item.nameProject}`,
                                }} className={'w-full block truncate'}>
                                {item.nameProject}
                            </Link>
                        </li>
                    ))
                ) : (
                    <li className={'w-full block whitespace-nowrap p-2'}>No projects</li>
                )}
                {children}
            </ul>
        </details>
    )
}
