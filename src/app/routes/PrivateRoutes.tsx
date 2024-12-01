import { useUserStore } from '../../shared/storages/UserStore.ts';
import { Navigate } from 'react-router-dom';
import { Content } from '../../widgets/Content.tsx';
import {IChildren} from '../../entities/models/IChildren.ts';
import { FC } from 'react';

export const PrivateRoutes: FC<IChildren> = ({ children }) => {
    const isAuth = useUserStore(state => state.isAuth);

    if (!isAuth) {
        return <Navigate to={'/login'} replace/>
    }

    return <Content> { children } </Content>;
}