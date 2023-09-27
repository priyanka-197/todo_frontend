import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import '../styles/header.css'
import { context } from '../main';
import { useContext } from 'react';
import { server } from '../main';
import axios from 'axios';
import toast from 'react-hot-toast';

const Header = () => {
  const {isAuthenticated,setIsAuthenticated,loading,setLoading}=useContext(context)
  

  const logoutHandler=async(e)=>{
setLoading(true)
    try {
     await axios.get(`${server}/users/logout`,{withCredentials:true,})
    
  toast.success('logout successfully')
    setIsAuthenticated(false)
    setLoading(false)
    
    } catch (error) {
      toast.error(error.response.data.message)
      setIsAuthenticated(true)
      setLoading(false)
      console.log(error)
    };
    
    }

  return (
   <nav className='header'>
    <div>
        <h2>Todo App</h2>
    </div>
    <article>
    <Link className="navlinks" to="/">HOME</Link>    
    <Link className="navlinks" to="/profile">PROFILE</Link>
    {isAuthenticated?<button disabled={loading} className='btn'onClick={logoutHandler}>logout</button>:  <Link className="navlinks" to="/login">LOGIN</Link>}
       
  

    </article>
   </nav>
  )
}

export default Header
