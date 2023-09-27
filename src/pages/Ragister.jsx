import React from 'react'
import "../styles/login.css"
import {Link,Navigate} from "react-router-dom";
import { useState,useContext } from 'react';
import axios from "axios";
import { server } from '../main';
import toast from "react-hot-toast"; 
import { context } from '../main';

const Ragister = () =>{
   const[name,setName]=useState("")
   const [email,setEmail]=useState("")
   const[password,setPassword]=useState("") 

   const {isAuthenticated,setIsAuthenticated,loading,setLoading}=useContext(context)
const submitHandler=async(e)=>{
e.preventDefault()
setLoading(true)
try {
  const {data}= await axios.post(`${server}/users/ragister`,{name,email,password},{headers:{"Content-Type":"application/json"},withCredentials:true,})
console.log(name,email,password)
toast.success(data.message)
setIsAuthenticated(true)
setLoading(false)

} catch (error) {
  toast.error('some err')
  setIsAuthenticated(false)
  setLoading(false)
  console.log(error)
};

}

if(isAuthenticated)return <Navigate to={"/"}/>

  return (
    <div>
    <form className='login'onSubmit={submitHandler}>
    <input type="text" placeholder='name' value={name} onChange={(e)=>setName(e.target.value)} required/> 
    <input type="email" placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)}required/>  
    <input type="password" placeholder='password'value={password} onChange={(e)=>setPassword(e.target.value)} required/>   
    <button disabled={loading} className="btn" type="submit">Sign up</button>   
    <h4>or</h4>
    <Link className="link"to="/login">Login</Link>
       </form>  
       </div>
  )
}

export default Ragister
