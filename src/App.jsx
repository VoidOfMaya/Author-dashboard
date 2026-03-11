import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import {NavBar} from './Components/topnav/topnav.jsx'
import { ErrorMsg } from './Components/usefullError/usefullErr.jsx';

import './App.css'
import { Outlet } from 'react-router-dom';

function App() {
  const [postData, setPostData]= useState({id: '',title:'', content:''})
  const [auth, setAuth]= useState({
    token: localStorage.getItem("token")|| '',
    user: JSON.parse(localStorage.getItem("user"))|| null,
  });
  const [error, setError]= useState(null)

  const redirect = useNavigate();
  //user log in log out
  const onLogout= ()=>{
    localStorage.clear();
    setAuth({token: '', user: null});
    redirect('/');
    
  }

  const onLoginSuccess= (user, token) =>{
     setAuth({token: token, user: user});
  }
  const authHandler = (code) =>{
    if (code === 401){
      localStorage.clear();
      setAuth({token: '', user: null})
    }
  }
  //handells posts
  const handlePostData =(id, title, content)=>{
    setPostData({
      id: id,
      title: title,
      content: content
    })
  }
  //handells Errors:
  const callError =(msg)=>{
    setError(msg)
  }
  return (
    <>
      <NavBar user={auth.user} logout={onLogout}/>
      <Outlet  context={{
        user: auth.user, 
        token: auth.token, 
        onLoginSuccess, 
        handlePostData, 
        postData,
        authHandler, 
        callError,
        }}/>

        {error && <ErrorMsg message={error} />}
    </>
  )
}

export default App
