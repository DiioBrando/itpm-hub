import { Route, Routes } from 'react-router-dom';
import Main from '../pages/Main.tsx';
import Project from '../pages/Project.tsx';
import Profile from '../pages/Profile.tsx';
import { Content } from '../widgets/Content.tsx';
import Login from '../pages/Login.tsx';
import Registration from '../pages/Registration.tsx';


export default function App() {
    return (
        <Content>
            <Routes>
                <Route path={'/'} element={<Main/>}/>
                <Route path={'/kanban/:id'} element={<Project/>}/>
                <Route path={'/profile'} element={<Profile/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/registration'} element={<Registration/>}/>
            </Routes>
        </Content>
    )
}
