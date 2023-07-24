import React from 'react'
import { Outlet } from 'react-router-dom'
import HomeNavbar from '../Components/Navbar/HomeNavbar'

const RootLayOut = () => {
  return (
    <div>
        <HomeNavbar/>
        <Outlet/>
    </div>
  )
}

export default RootLayOut