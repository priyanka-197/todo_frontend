import React, { useEffect } from 'react';
import axios from "axios";
import { server } from '../main';
import "../styles/task.css"

const Task = ({title,descreption,isCompeleted,updateHandler,deleteHandler,id}) => {


  return (
  <div className='task'>
      <div className='title'>
    <h4>{title}</h4>
    <p>{descreption}</p>
    </div>
    <div className='title'>
      <input type='checkbox'checked={isCompeleted}onChange={()=>updateHandler(id)}/>
      
      <button className='btn' onClick={()=>deleteHandler(id)}>delete</button>
    </div>
  </div>
  )
}

export default Task
