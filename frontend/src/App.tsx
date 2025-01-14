import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import react from 'react';
import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import Apps from './components/App';
import Sidebar2 from './components/SideBar2';
import Dashboard from './components/Dashboard';

const  App:react.FC = () => {
  return (
<>
<BrowserRouter>
<Routes>
  <Route path='/' element={<Signup/>}/>
  <Route path='/login' element={<Login/>}/>
  <Route path="/app" element={<Sidebar2/>}>
<Route path="dashboard" element={<Dashboard/>}/>

        </Route>
</Routes>
</BrowserRouter>
</>
  )
}

export default App
