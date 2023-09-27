import { useContext, useEffect, useState } from 'react';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import Home from './pages/Home';
import Header from './components/Header';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Ragister from './pages/Ragister';
import { Toaster } from 'react-hot-toast';
import {context,server} from "./main"
import axios from 'axios';




function App() { 
   const {user,setUser,setIsAuthenticated}=useContext(context)
   useEffect(()=>{
 axios.get(`${server}/users/me`,{withCredentials:true,}).then((res)=>{setUser(res.data.user)
  setIsAuthenticated(true)
 })
.catch((err)=>{setUser({});
 setIsAuthenticated(false)})
  },[])

  return (
  
    <Router>
    <Header/>
    
<Routes>
<Route path="/" element={<Home/>}/>
<Route exact path="/profile" element={<Profile/>}/>
<Route exact path="/login" element={<Login/>}/>
<Route exact path="/ragister" element={<Ragister/>}/>

</Routes>
<Toaster/>
    </Router>
   
    
  )
}

export default App
