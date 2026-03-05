import style from './loading.module.css';
import load from '/src/assets/icons/loading.svg'
const Loading = () =>{
    return (
        <div className={style.LoadeContainer}>
            <img src={load} alt='Loading...' className={style.loader}></img>
            <h3 className={style.loadText}>Loading ...</h3>
        </div>
    )
}
export{
    Loading
}