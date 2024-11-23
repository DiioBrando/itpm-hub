import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../pages/Main.tsx";
import Kanban from "../pages/Kanban.tsx";
import Profile from "../pages/Profile.tsx";
import Navbar from "../shared/header/NavBar.tsx";


export default function App() {

  return (
      <>
          <BrowserRouter>
              <Navbar/>
              <Routes>
                  <Route path={'/'} element={<Main/>}/>
                  <Route path={'kanban'} element={<Kanban/>}/>
                  <Route path={'profile'} element={<Profile/>}/>
              </Routes>
          </BrowserRouter>
      </>
  )
}
