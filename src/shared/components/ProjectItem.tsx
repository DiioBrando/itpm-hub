import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import { ProjectItemProps } from "../../entities/models/ProjectItemProps.ts";

export const ProjectItem: FC<ProjectItemProps> = ({ project, liStyle, onSelect, isSelected, selectMode }) => {
    return (
        <li className={liStyle || 'list-none hover:bg-gray-300 pr-2 pl-2 p-1 rounded cursor-pointer max-w-[150px] whitespace-nowrap'} key={project._id}>
            <div className="flex items-center justify-between">
                <Link to={{
                    pathname: `/project/${project.nameProject}`,
                }} className={'w-full block truncate'}>
                    {project.nameProject}
                </Link>
                {selectMode && (
                    <Button setting={{
                        textValue: isSelected ? 'Deselect' : 'Select',
                        onClickButton: () => onSelect(project._id),
                        buttonStyle: `ml-2 ${isSelected ? 'bg-blue-500 text-white' : 'bg-gray-200'} p-1 rounded`,
                    }} />
                )}
            </div>
        </li>
    );
};
