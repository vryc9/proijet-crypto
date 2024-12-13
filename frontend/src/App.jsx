import './App.scss'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/home/Home';
import Password from './pages/passwordList/password'
import AddPassword from './pages/addPassword/addPassword';
import CreateVault from './pages/createVault/createVault';
import Auth from './pages/auth/Auth';
import EditPassword from './pages/editPassword/editPassword';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path='/passwords' element={ <Password />}/>
      <Route path='/addpassword' element={ <AddPassword />}/>
      <Route path='/createvault' element={ <CreateVault />}/>
      <Route path='/auth' element={ <Auth />}/>
      <Route path='/edit/:id' element={ < EditPassword/>}/>
    </>
  )
);

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
