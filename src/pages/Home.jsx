import React, { useContext } from 'react';
import { useState,useEffect} from 'react';
import "../styles/login.css"
import axios from 'axios';
import {server} from "../main";
import toast from "react-hot-toast"; 
import Task from "../components/Task"
import { Navigate } from 'react-router-dom';
import { context } from '../main';



const Home = () => {
  const [title,setTitle]=useState("")
  const [ descreption,setDescreption]=useState("")
  const [task,setTask]=useState([])
  const [refresh,setRefresh]=useState(false)
  const {isAuthenticated}=useContext(context)

  const deleteHandler=async(id)=>{
    try {
      const {data}= await axios.delete(`${server}/task/${id}`,{withCredentials:true,})
      console.log(data)
     toast.success('deleted')
     setRefresh((prev)=>!prev)
      } catch (error) {
        toast.error(error.response.data.message)
      }

  }
  const updateHandler=async(id)=>{
 try {
 const {data}= await axios.put(`${server}/task/${id}`,{},{withCredentials:true,})
toast.success(data.message)
setRefresh((prev)=>!prev)
 } catch (error) {
  toast.error(error.response.data.message)
 }
  }
  const submitHandler=async(e)=>{
    e.preventDefault()
    try {
      const {data} = await axios.post(`${server}/task/new`,{title,descreption},{headers:{"Content-Type":"application/json"},withCredentials:true,})
      toast.success(data.message)
      setDescreption("")
      setTitle("")
setRefresh((prev)=>!prev)
    } catch (error) {
      toast.error(error.response.data.message)
    }
 
  }
  useEffect(()=>{

    axios.get(`${server}/task/my`,{withCredentials:true,}).then((res)=>setTask(res.data.tasks)).catch((err)=>{toast.error(err.response.data.message)})
 
    },[refresh])
   if(!isAuthenticated)
   {
    return( <>
      <Navigate to={"/login"}/>
     
     </>)
  }
  return (
    <div>
   
    <form className='login'onSubmit={submitHandler}>
<input type="text" name={title} value={title} onChange={(e)=>setTitle(e.target.value)}placeholder='task'></input> <br/>
<input type="text" name={ descreption} value={ descreption}onChange={(e)=>setDescreption(e.target.value)}placeholder='descreption'></input>

<button className='btn' type="submit">add Task</button>
</form>
<div>
  <ul>{
    task.map((e,i)=>{
      return <li key={i}>
      <Task title={e.title} descreption={e.descreption} isCompleted={e.isCompeleted} updateHandler={updateHandler} deleteHandler={deleteHandler} id={e._id}/>
      </li>
    })
  }</ul>
</div>
    </div>
  )
}

export default Home
