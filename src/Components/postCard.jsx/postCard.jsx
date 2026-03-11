import style from './postcard.module.css'
import { useState } from 'react'
import { ButtonLoading } from '../loading/load.jsx'
import { useOutletContext } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { ErrorMsg } from '../usefullError/usefullErr.jsx'

function PostCard({post, updateData}){
    const [isLoading, setIsLoading] = useState(false)
    const {token, handlePostData, callError } = useOutletContext();

    const redirect = useNavigate();

    const reformatDate =(date)=>{
        return new Date(date).toLocaleDateString("en-US", {
            weekday: "short",   // Mon, Tue, ...
            year: "numeric",    // 2026
            month: "short",     // Mar
            day: "numeric"      // 2
    });
    }
    const onPublish =async (id)=>{
        setIsLoading(true)
        ///publish/:id
        try{
            await fetch(`${import.meta.env.VITE_API_URL}/post/publish/${id}`,{
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            })
            .then(response=>{
            if(response.status >= 400) {
                throw new Error(`${response.status}, ${response.error}`|| `${response.status}, error, could not preform function`)
            }
            //return response.json();
            updateData();
            })
            .catch(error => {throw new Error(error)})
            .finally(()=> {
                setIsLoading(false)

            });            
        }catch(err){
            callError(err.message)
        }
    }
    const deletePost = async(id)=>{
        try{
            const proceed = confirm('this action will delete your post, do you wish to proceed');
            if(!proceed) return;
            setIsLoading(true)
            await fetch(`${import.meta.env.VITE_API_URL}/post/${id}`,{
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            })
            .then(response=>{
            if(response.status >= 400) {
                throw new Error(`${response.status}, ${response.error}`|| `${response.status}, error, could not preform function`)
            }
            updateData();
            })
            .catch(error => {throw new Error(error)})
            .finally(()=> {
                setIsLoading(false)

            });            
        }catch(err){
            callError(err.message)
        }

        
    }
    return(
        <div className={style.tableItem}>
            <div className={style.id}>{isLoading? (<ButtonLoading />): (post.id)}</div>
            <div className={style.name}>{post.title}</div>
            <div className={style.creation}>{reformatDate(post.createdAt)}</div>
            <div className={style.published}>{post.isPublished? reformatDate(post.publishedAt) : 'PENDING'}</div>
            <div className={style.opts}>
                {!post.isPublished? (
                    <div className={style.pendingOpts}>
                        <button type='button' 
                                style={{backgroundColor: "green", color: 'white'}} 
                                onClick={()=>onPublish(post.id)}>PUBLISH</button> 

                        <button type='button' 
                                style={{backgroundColor: "red", color: 'white'}} 
                                onClick={()=>deletePost(post.id)}>DELETE</button>

                        <button type='button' 
                                style={{backgroundColor: "orange", color: 'white'}} 
                                onClick={()=>{
                                    handlePostData(post.id, post.title, post.content)
                                    redirect('/editPost')
                                }
                        }>EDIT</button>                    
                    </div>
                   
                ):(
                    <div className={style.publishedOpts}>
                    <button type='button' 
                            style={{backgroundColor: "red", color: 'white'}} 
                            onClick={()=>deletePost(post.id)}>
                                DELETE
                    </button>

                    <button type='button' 
                            style={{backgroundColor: "orange", color: 'white'}} 
                            onClick={()=>{
                                handlePostData(post.id, post.title, post.content)
                                redirect('/editPost')
                            }
                    }> EDIT</button>                    
                    </div>
                )}

            </div>
        </div>
    )
}
export{
    PostCard
}