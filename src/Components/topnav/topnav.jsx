import { NavLink } from 'react-router-dom';
import style from './topnav.module.css'
import { useEffect, useState } from 'react';
import menuIcon from '../../assets/icons/home-outline.svg'



const ifUser =(user, logout, state)=>{
    if(user){
        return(
             <div className={state? style.isPhone: style.isDesk}>
                <NavLink to={'/createPost'}>New post</NavLink>
                <NavLink to={'/dashboard'}>Dashboard</NavLink>
                <NavLink><a href='https://the-devlog.netlify.app/'>Devlog</a></NavLink>
                <NavLink type='button'
                onClick={e=>{
                    e.preventDefault();
                    logout();
                }}
                >logout</NavLink>
            </div>
        )

    }else{
        return(
            <div className={state? style.isPhone: style.isDesk}>
                <NavLink to={'/'}>log in</NavLink>
            </div>
        )            
    }
}
const NavBar = ({user , logout}) =>{  

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [active, setActive]= useState(false);

    useEffect(()=>{
        const handleResize = () =>{
            setIsMobile(window.innerWidth <= 768)
        }
        window.addEventListener('resize', handleResize)
        return()=> window.removeEventListener("resize", handleResize);
    },[])
    return(
        <div className={style.topnav}>
            <h1 className={style.title}>Devdash <div className={style.titleRout}>/{user? user.firstName : ''} </div></h1>
            <div className={style.NavLinks}>
                {isMobile?(
                    <div>
                        <img src={menuIcon} className={style.menuIcon} onClick={()=> setActive(!active)}></img> 
                        <div className={style.menuToggle} style={active? {display: 'block'}:{display: 'none'}}>
                            {ifUser(user,logout,isMobile)}
                        </div>
                    </div>
                ):(
                    <>
                        {ifUser(user,logout, isMobile)}
                    </>
                )}                
            </div>
        </div>
    )
}

export{
    NavBar
}