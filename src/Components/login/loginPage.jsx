import { useState } from "react"
import style from "./login.module.css"
import { ButtonLoading } from '../loading/load.jsx'
import { useOutletContext, useNavigate, Link } from "react-router-dom"
import { ErrorMsg } from "../usefullError/usefullErr.jsx"

function LoginPage(){
    const [emai, setEmail]= useState('')
    const [password, setPassword]= useState('')
    const [isLoading, setIsLoading] = useState(false)

    const {onLoginSuccess, callError} = useOutletContext();
    const redirectTo = useNavigate();

    const handleSubmit= async (e) =>{
        e.preventDefault();
        callError(null);
        try{
            setIsLoading(true)
            const res = await fetch('https://blog-api-vdtu.onrender.com/auth/login',{
                method: 'POST',
                headers:{
                    "Content-Type": "application/json",
                },
                body:JSON.stringify({"email": emai, "password": password})
            })
             //handles invalid data if error object is present
            const data = await res.json();
            if(!res.ok) throw new Error ("please enter a valid email and password")

            //handels  valid user thats not an author
             if(data.user.user.roleId === 1){
                throw new Error("Unauthorized access: user not an Author")
             }
            localStorage.setItem("token", data.user.token);
            localStorage.setItem("user", JSON.stringify(data.user.user));                

            onLoginSuccess(data.user.user, data.user.token)  
            redirectTo('/dashboard');
        }catch(err){
            console.log(err)
            callError(err.message)
        }
    
    setIsLoading(false);
    }
    return(
        <main className={style.loginPage}>
            <h1>log in</h1>
            <div className={style.loginContainer}>
                <form onSubmit={handleSubmit}>
                    <label>Email: </label>
                    <input type="text"
                           placeholder="Example@Example.com" 
                           required
                           onChange={(e)=>setEmail(e.target.value)}
                           ></input>
                    <label>Password: </label>
                    <input type="password" 
                           placeholder="password" 
                           required
                           onChange={(e)=>{setPassword(e.target.value)}
                        }
                           ></input>
                        {isLoading ? (
                                <>
                                    <ButtonLoading />
                                </>
                            ):(
                                <>
                                    <button>log in</button>                                
                                </>
                            )}

                </form>
            </div>
            {/*throwError()*/}
        </main>
    )
}

export{
    LoginPage
}