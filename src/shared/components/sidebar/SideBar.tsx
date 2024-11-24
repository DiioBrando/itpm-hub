import { SideItems } from './SideItems.tsx';
import { Button } from '../Button.tsx';
import {Link} from "react-router-dom";
export const SideBar = () => {
    return(
        <>
            <aside>
                <SideItems>
                    <div className={'p-1 pr-2 pl-2 m-1'}>
                        <Button setting={{
                            textValue: 'my projects',
                            textStyle: 'p-2',
                            buttonStyle: 'rounded-md',
                        }} />
                        <ul>
                            <li className={'hover:bg-gray-300 max-w-max pr-2 pl-2 p-0 rounded'}>
                               <Link to={'/all-projects'}>
                                    All Projects
                                </Link>
                            </li>

                        </ul>
                    </div>
                    <div>

                    </div>
                </SideItems>
            </aside>
        </>
    );
}