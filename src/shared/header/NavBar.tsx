import NavItems from './NavItems.tsx';
import {Link} from "react-router-dom";
import {Logo} from "../../../public/icons/Logo.tsx";

export default function Navbar() {
    return (
        <header className={'pl-5 pr-5 m-1 h-[50px]'}>
            {
                <NavItems>
                    <div className={'flex gap-2.5'}>
                        <button>MenuBurger</button>
                        <Link to={'/'} className={'w-[70px]'}><Logo /></Link>
                    </div>
                    <div>
                        <input placeholder={'search task'}/>
                        <button>Create Task KanBan</button>
                    </div>
                    <div>
                        <button>Profile</button>
                    </div>
                </NavItems>
            }
        </header>
    );
}