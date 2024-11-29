import {ChangeEvent, FC, useEffect, useState} from 'react';
import { IDetails } from '../../entities/models/IDetails.ts';
import {Arrow} from '../../../public/icons/Arrow.tsx';
import {Link} from 'react-router-dom';
import {IProjects} from '../../entities/models/IProjects.ts';
import {Input} from './Input.tsx';

export const Details: FC<IDetails> = ({ dataProjects, summaryText, children }) => {
    const [projects, setProjects] = useState<IProjects[]>(dataProjects);
    const [search, setSearch] = useState<string>('');
    const [isOpen, setOpen] = useState({
        isOpen: false,
        rotateArrow: 'rotate-180',
    });
    const onToggleDetail = () => {
        const newStyle = isOpen.isOpen? 'rotate-180': '-rotate-90';
        setOpen({ isOpen: !isOpen.isOpen, rotateArrow: newStyle});
    }
    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }
    const filterProjects = (projectName, projects) => {
        if(!projectName) return projects;

       return projects.filter(item => item.nameProject.toLowerCase().includes(projectName.toLowerCase()));
    }
    useEffect(() => {
        const Debounce = setTimeout(() => {
            const filteredProjects = filterProjects(search, dataProjects);
            setProjects(filteredProjects);
        }, 300);

        return () => clearTimeout(Debounce);
    }, [dataProjects, search]);
    return (
        <details className={'text-black max-w-[160px]'} onToggle={onToggleDetail}>
            <summary className={'list-none hover:bg-gray-300 max-w-max pr-2 pl-2 p-0 rounded cursor-pointer'}>
                <div className={'flex items-center'}>
                    <span className={`w-[20px] h-[20px] ${isOpen.rotateArrow}`}><Arrow/></span>
                    <span>{summaryText}</span>
                </div>
            </summary>
            <ul>
                <li>
                    <Input input={{
                        onChangeInput: handleChangeInput,
                        value: search,
                        type: 'text',
                        placeholder: 'search projects here',
                        style: 'w-full max-w-max',
                    }} />
                </li>
                {
                    projects.map((item) => (
                        <li className={'list-none hover:bg-gray-300 pr-2 pl-2 p-0 rounded cursor-pointer max-w-[150px]'} key={item._id}>
                            <Link to={'/' + item._id}>
                                { item.nameProject }
                            </Link>
                        </li>
                    ))
                }
                {children}
            </ul>
        </details>
    )
}