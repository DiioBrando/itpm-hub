import {Button} from "../shared/components/Button.tsx";
import {PlusSvg} from "../../public/icons/PlusSvg.tsx";
import {TasksColum} from "../shared/components/kanban/TasksColum.tsx";

export default function Kanban() {
    return(
        <>
            <TasksColum />
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