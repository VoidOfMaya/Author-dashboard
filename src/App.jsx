import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import {NavBar} from './Components/topnav/topnav.jsx'

import './App.css'
import { Outlet } from 'react-router-dom';

function App() {
  const [postData, setPostData]= useState({id: '',title:'', content:''})
  const [auth, setAuth]= useState({
    token: localStorage.getItem("token")|| '',
    user: localStorage.getItem("user")|| null,
  });
  const redirect = useNavigate();
  const onLogout= ()=>{
    localStorage.clear();
    setAuth({token: '', user: null});
    redirect('/');
    
  }

  const onLoginSuccess= (user, token) =>{
     setAuth({token: token, user: user});

  
  }
  const handlePostData =(id, title, content)=>{
    setPostData({
      id: id,
      title: title,
      content: content
    })
  }
  return (
    <>
      <NavBar user={auth.user} logout={onLogout}/>
      <Outlet  context={{user: auth.user, token: auth.token, onLoginSuccess, handlePostData, postData }}/>

    </>
  )
}

export default App
