import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/app.scss'
import {createContext,useState} from "react"

export const server = "https://node-5gbc.onrender.com/api/v1"
export const context = createContext({isAuthenticated:false}) 

const Appwraper=()=>{

const[isAuthenticated,setIsAuthenticated]=useState(false)
const[loading,setLoading]=useState(false)
const [user,setUser]=useState({})
return (
<context.Provider value={{isAuthenticated,setIsAuthenticated,loading,setLoading,user,setUser}}>
<App/>
</context.Provider>

)
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
 <Appwraper/>
   
  </React.StrictMode>,
)
