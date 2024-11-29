import { Button } from '../shared/components/Button.tsx';
import { PlusSvg } from '../../public/icons/PlusSvg.tsx';
import { TasksColumn } from '../shared/components/kanban/TasksColumn.tsx';




export default function Project() {
    return(
        <div className={'flex h-screen w-full p-2'}>
            <TasksColumn />
            <Button setting={{
                image: {
                    svgComponent: {
                        image: <PlusSvg/>,
                        style: 'w-[50px] h-[50px]',
                    },
                },
                buttonStyle: 'rounded-md h-fit p-2'
            }}/>
        </div>
    )
}