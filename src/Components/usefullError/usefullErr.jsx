import style from './usefullError.module.css'
const Error = ({message})=>{
    if(message){
        return(
            <div className={style.usefullError}>
                Error: {message}
            </div>
        )
    }
}
export{
    Error
}