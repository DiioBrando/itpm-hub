import {Link} from 'react-router-dom';
import {ArrowBar} from '../../../../public/icons/ArrowBar.tsx';
import {Button} from '../Button.tsx';
import {Input} from '../Input.tsx';
import {SearchSvg} from '../../../../public/icons/SearchSvg.tsx';
import {PlusSvg} from '../../../../public/icons/PlusSvg.tsx';
import {ProfileIcon} from '../../../../public/icons/ProfileIcon.tsx';
import {useSidebar} from '../../storages/Sidebar.ts';
import {createRef, useEffect, useState} from 'react';
import {NavItems} from "./NavItems.tsx";
import {Dropdown} from "../Dropdown.tsx";
import {useUserStore} from "../../storages/UserStore.ts";
import {ILogOut} from "../../../../public/icons/ILogOut.tsx";
import {useClickOutSide} from "../../hooks/useClickOutSide.tsx";
import {HomeSvg} from "../../../../public/icons/HomeSvg.tsx";

export const Navbar = () => {
    const handleChangeToggle = useSidebar((state) => state.handleChangeToggle);
    const toggleStyle = useSidebar((state) => state.style);
    const logOut = useUserStore(state => state.logout);
    const user = useUserStore(state => state.user);
    const [isOpenProfile, setOpenProfile] = useState(false);
    const ref = createRef<HTMLDivElement>(null);
    useClickOutSide(ref, () => setTimeout(() => setOpenProfile(false),300));
    const handleChangeOpen = () => {
        setOpenProfile(prevState => !prevState);
    }

    useEffect(() => {
        useSidebar.getState?.().loadStateLocalStorage();
    }, []);

    return (
        <header className={'h-[65px]'}>
            {
                <NavItems>
                    <div className={'flex gap-1 items-center'}>
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
                        <Link to={'/'} className={'w-[30px]'}>
                            <Button setting={{
                                image: {
                                    svgComponent: {
                                        image: <HomeSvg/>,
                                        style: 'w-[40px] h-[40px] p-1',
                                    },
                                },
                                buttonStyle: 'rounded-md flex items-center',
                            }} />
                        </Link>
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
                                style: 'border border-l-0 rounded-l-none rounded-md pt-1 pb-1 p-2 outline-none w-full min-w-[150px]'
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
                    <div ref={ref} className={'flex relative items-center'}>
                        <Button setting={{
                            image: {
                                svgComponent: {
                                    image: <ProfileIcon/>,
                                    style: 'w-[40px] h-[40px] flex justify-center rounded-full'
                                },
                            },
                            onClickButton: handleChangeOpen,
                            buttonStyle: 'rounded-full bg-blue-200',
                        }}/>
                        <Dropdown refObj={ref} isOpen={isOpenProfile} style={'text-md flex-col'}>
                            <>
                                <div className={'p-1'}>
                                    {user.email}
                                </div>
                                <div className={'p-1 hover:bg-gray-300 rounded-md'}>
                                    <Link to={'/profile'}>
                                        <Button setting={{
                                            textValue: 'profile',
                                            buttonStyle: 'hover:bg-0 flex flex-row-reverse items-center',
                                            image: {
                                                svgComponent: {
                                                    image: <ProfileIcon />,
                                                    style: 'w-[20px] h-[20px]',
                                                },
                                            },
                                        }}/>
                                    </Link>
                                </div>
                                <div className={'p-1 hover:bg-gray-300 rounded-md'}>
                                    <Link to={'/login'}>
                                    <Button setting={{
                                        textValue: 'log out',
                                        onClickButton: logOut,
                                        buttonStyle: 'rounded-md flex flex-row-reverse items-center',
                                        image: {
                                            svgComponent: {
                                                image: <ILogOut />,
                                                style: 'w-[20px] h-[20px] p-1',
                                            },
                                        },
                                    }}/>
                                    </Link>
                                </div>
                            </>
                        </Dropdown>
                    </div>
                </NavItems>
            }
        </header>
    );
}