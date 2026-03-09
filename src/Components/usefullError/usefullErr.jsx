import style from './usefullError.module.css'
const ErrorMsg = ({message})=>{
    if(message){
        return(
            <div className={style.usefullError}>
                Error: {message}
            </div>
        )
    }
}
export{
    ErrorMsg
}