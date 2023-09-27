import React from 'react';
import { useContext } from 'react';
import  {context}from "../main"

const Profile = () => {
  const {isAuthenticated,loading,user}=useContext(context)
  console.log(user)
  return (
    <div>

     {isAuthenticated?(
     <>
     <h1>{user?.name}</h1>
      <h2>{user?.email}</h2>
      </>):<h2>plesae login first</h2>}
      
     
    </div>
  )
}

export default Profile
