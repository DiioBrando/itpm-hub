import {Link} from 'react-router-dom';
import {Logo} from '../../../../public/icons/Logo.tsx';
import {ArrowBar} from '../../../../public/icons/ArrowBar.tsx';
import {Button} from '../Button.tsx';
import {Input} from '../Input.tsx';
import {SearchSvg} from '../../../../public/icons/SearchSvg.tsx';
import {PlusSvg} from '../../../../public/icons/PlusSvg.tsx';
import {ProfileIcon} from '../../../../public/icons/ProfileIcon.tsx';
import {useSidebar} from '../../storages/Sidebar.ts';
import {useEffect} from 'react';
import {NavItems} from "./NavItems.tsx";

export const Navbar = () => {
    const handleChangeToggle = useSidebar((state) => state.handleChangeToggle);
    const toggleStyle = useSidebar((state) => state.style);
    useEffect(() => {
        useSidebar.getState().loadStateLocalStorage();
    }, []);

    return (
        <header className={'h-[65px]'}>
            {
                <NavItems>
                    <div className={'flex gap-4 items-center'}>
                        <Button setting={{
                            image: {
                                svgComponent: {
                                    image: <ArrowBar/>,
                                    style: 'w-[30px] h-[30px]',
                                },
                            },
                            buttonStyle: `p-1 hover:rounded-md ${toggleStyle}`,
                            onClickButton: handleChangeToggle,

                        }}/>
                        <Link to={'/'} className={'w-[50px]'}><Logo/></Link>
                    </div>
                    <div className={'flex gap-2.5'}>
                        <div className={'flex items-center'}>
                            <Button setting={{
                                image: {
                                    svgComponent: {
                                        image: <SearchSvg/>,
                                        style: 'w-[34px] h-[34px] border border-r-0 rounded rounded-r-none pb-2 pt-2'
                                    },
                                },
                                buttonStyle: 'hover:rounded-r-none hover:rounded',
                            }}/>
                            <Input input={{
                                placeholder: 'search here',
                                style: 'border border-l-0 rounded-l-none rounded-md pt-1 pb-1 p-2 outline-none'
                            }}/>
                        </div>
                        <Button setting={{
                            image: {
                                svgComponent: {
                                    image: <PlusSvg/>,
                                    style: 'w-[20px] h-[20px]',
                                },
                            },
                            textValue: 'Create',
                            buttonStyle: 'flex flex-row-reverse gap-2 items-center bg-blue-400 p-1 pt-0 pb-0 rounded-md text-white',
                        }}/>
                    </div>
                    <div className={'flex items-center'}>
                        <Button setting={{
                            image: {
                                svgComponent: {
                                    image: <ProfileIcon/>,
                                    style: 'w-[40px] h-[40px] flex justify-center rounded-full'
                                },
                            },
                            buttonStyle: 'rounded-full bg-blue-200',
                        }}/>
                    </div>
                </NavItems>
            }
        </header>
    );
}