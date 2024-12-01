import Profile from '../../pages/Profile.tsx';
import Project from '../../pages/Project.tsx';
import Login from '../../pages/Login.tsx';
import Registration from '../../pages/Registration.tsx';
import { createBrowserRouter } from 'react-router-dom';
import { PrivateRoutes } from './PrivateRoutes.tsx';
import App from '../App.tsx';
import Home from '../../pages/Home.tsx';

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                index: true,
                element: (
                    <PrivateRoutes>
                        <Home/>
                    </PrivateRoutes>
                ),
            },
            {
                path: '/profile',
                element: (
                    <PrivateRoutes>
                        <Profile/>
                    </PrivateRoutes>
                ),
            },
            {
                path: '/project/:id',
                element: (
                    <PrivateRoutes>
                        <Project/>
                    </PrivateRoutes>
                ),
            },
            {
                path: '/login',
                element: <Login/>,
            },
            {
                path: '/registration',
                element: <Registration/>,
            },
        ],
    }
])