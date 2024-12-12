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

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path='/passwords' element={ <Password />}/>
      <Route path='/addpassword' element={ <AddPassword />}/>
      <Route path='/createvault' element={ <CreateVault />}/>
    </>
  )
);

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
