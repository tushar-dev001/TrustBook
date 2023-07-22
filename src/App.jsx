import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Registration from './Pages/Registration/Registration'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './Pages/Login/Login'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Registration/>
  },
  {
    path: '/login',
    element: <Login/>
  }
])

const App = () => {
  return (
    <div>
      <Navbar/>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App