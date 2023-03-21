import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Admin from './pages/Admin';
import Home from './pages/Home';
import Login from './pages/Login';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/admin",
    element: <Admin/>,
  },
  {
    path: "/login",
    element: <Login/>,
  }
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App