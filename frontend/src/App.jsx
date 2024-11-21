import './App.scss'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/home/Home';
import Password from './pages/passwordList/password'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path='/passwords' element={ <Password />}/>
    </>
  )
);

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
