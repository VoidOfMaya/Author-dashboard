import style from './topnav.module.css'



const ifUser =(user, logout)=>{
    if(user){
        return(
            <>
                <h3>logged in links</h3>
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
                <h3>logged out links</h3>
            </>
        )            
    }
}
const NavBar = ({user , logout}) =>{
    const userdata = JSON.parse(user)
    return(
        <div className={style.topnav}>
            <h1 className={style.title}>DevLog <div className={style.titleRout}>/{user? userdata.firstName : ''}/Dashboard </div></h1>
            <div className={style.NavLinks}>
                {ifUser(user,logout)}
            </div>

            
        </div>
    )
}

export{
    NavBar
}