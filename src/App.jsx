import { useState, useEffect } from 'react'
import {NavBar} from './Components/topnav/topnav.jsx'

import './App.css'
import { Outlet } from 'react-router-dom';

function App() {
  const [auth, setAuth]= useState({
    token: localStorage.getItem("token")|| '',
    user: localStorage.getItem("user")|| null,
  });
  const onLogout= ()=>{
    localStorage.clear();
    setAuth({token: '', user: null});
  }

  const onLoginSuccess= (user, token) =>{
    setAuth({token: token, user: user});
    
  }

  return (
    <>
      <NavBar user={auth.user} logout={onLogout}/>
      <Outlet  context={{user: auth.user, token: auth.token, onLoginSuccess}}/>

    </>
  )
}

export default App
