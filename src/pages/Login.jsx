import React from 'react';
import {Link,Navigate} from "react-router-dom";
import "../styles/login.css"
import { useState,useContext } from 'react';
import { server } from '../main';
import toast from "react-hot-toast"; 
import axios from "axios";
import {context} from "../main"
const Login = () => {

  const [email,setEmail]=useState("")
  const[password,setPassword]=useState("") 
  const {isAuthenticated,setIsAuthenticated,loading,setLoading}=useContext(context)
  const submitHandler=async(e)=>{
    e.preventDefault()
    setLoading(true)
    try {
      const {data}= await axios.post(`${server}/users/login`,{email,password},{headers:{"Content-Type":"application/json"},withCredentials:true,})
    console.log(email,password)
    toast.success(data.message)
    setIsAuthenticated(true)
    setLoading(false)
    
    
    } catch (error) {
      toast.error(error.response.data.message)
      setIsAuthenticated(false)
      setLoading(false)
      console.log(error)
    };
    
    }


  if(isAuthenticated)return <Navigate to={"/"}/>
  return (
    <div>
    <form className='login'onSubmit={submitHandler}>
<input type="email" placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)}required/> 
<input type="password" placeholder='password'value={password} onChange={(e)=>setPassword(e.target.value)}required/>    
     <button disabled={loading} className="btn" type="submit">Login</button>  
     <h4>or</h4>
     <Link className="link" to="/ragister">Sign Up</Link>
        </form>  
    </div>
  )
}

export default Login
