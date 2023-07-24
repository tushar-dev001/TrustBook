import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DarkMode from '../DarkMode/DarkMode'

const Navbar = () => {

  return (
    <div className="navbar bg-primary text-white">
  <div className="flex-1">
    <button className="btn btn-ghost normal-case text-xl">TrustBook</button>
  </div>
  <div className="flex-none p-2 pr-5 gap-4">
    
    <button className='btn btn-secondary text-white'><Link to='/login'>Login</Link></button>
    <button className='btn btn-secondary text-white'><Link to='/'>Register</Link></button>

  <DarkMode/>
  </div>
</div>
  )
}

export default Navbar