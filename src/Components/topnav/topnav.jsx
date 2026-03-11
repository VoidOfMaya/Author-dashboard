import { NavLink } from 'react-router-dom';
import style from './topnav.module.css'



const ifUser =(user, logout)=>{
    if(user){
        return(
            
            <div className={style.navBarLinks}>
                <NavLink to={'/createPost'}>New post</NavLink>
                <NavLink to={'/dashboard'}>Dashboard</NavLink>
                <button type='button'
                onClick={e=>{
                    e.preventDefault();
                    logout();
                }}
                >logout</button>
            </div>
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
    return(
        <div className={style.topnav}>
            <h1 className={style.title}>DevLog <div className={style.titleRout}>/{user? user.firstName : ''}/Dashboard </div></h1>
            <div className={style.NavLinks}>
                {ifUser(user,logout)}
            </div>

            
        </div>
    )
}

export{
    NavBar
}