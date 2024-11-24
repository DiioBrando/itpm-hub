import {Button} from '../shared/components/Button.tsx';
import {PlusSvg} from '../../public/icons/PlusSvg.tsx';
import {TasksColumn} from '../shared/components/kanban/TasksColumn.tsx';

export default function Kanban() {
    return(
        <>
            <TasksColumn />
            <Button setting={{
                image: {
                    svgComponent: {
                        image: <PlusSvg/>,
                        style: 'w-[50px] h-[50px]',
                    },
                },
            }}/>
        </>
    )
}