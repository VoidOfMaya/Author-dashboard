import { NavLink } from 'react-router-dom';
import style from './topnav.module.css'



const ifUser =(user, logout)=>{
    if(user){
        return(
            
            <>
                <NavLink to={'/createPost'}>New post</NavLink>
                <NavLink to={'/dashboard'}>Dashboard</NavLink>
                <button type='button'
                onClick={e=>{
                    e.preventDefault();
                    logout();
                }}
                >logout</button>
            </>
        )

    }else{
        return(
            <>
                <NavLink to={'/'}>log in</NavLink>
            </>
        )            
    }
}
const NavBar = ({user , logout}) =>{

    const userData = JSON.parse(user)    
    return(
        <div className={style.topnav}>
            <h1 className={style.title}>DevLog <div className={style.titleRout}>/{user? userData.firstName : ''}/Dashboard </div></h1>
            <div className={style.NavLinks}>
                {ifUser(user,logout)}
            </div>

            
        </div>
    )
}

export{
    NavBar
}