import style from './postcard.module.css'
import { useState } from 'react'
import { ButtonLoading } from '../loading/load.jsx'
import { useOutletContext } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function PostCard({post, publish}){
    const [isLoading, setIsLoading] = useState(false)
    const {token, handlePostData } = useOutletContext();
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
        await fetch(`https://blog-api-vdtu.onrender.com/post/publish/${id}`,{
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        })
        .then(response=>{
        if(response.status >= 400) {
            throw new Error('A server error has occured error code: ' + response.status )
        }
        return response.json();
        })
        .catch(error => console.error(error))
        .finally(()=> {
            setIsLoading(false)

        });
        
    }
    const deletePost = async(id)=>{
        const proceed = confirm('this action will delete your post, do you wish to proceed');
        if(!proceed) return;
        setIsLoading(true)
        await fetch(`https://blog-api-vdtu.onrender.com/post/${id}`,{
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        })
        .then(response=>{
        if(response.status >= 400) {
            throw new Error('A server error has occured error code: ' + response.status )
        }
        return 'Post, deleted'
        })
        .catch(error => console.error(error))
        .finally(()=> {
            setIsLoading(false)

        });
        
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
                        <button type='button' onClick={()=>onPublish(post.id)}>PUBLISH</button> 
                        <button type='button' onClick={()=>deletePost(post.id)}>DELETE</button>
                        <button type='button' onClick={()=>{
                            handlePostData(post.id, post.title, post.content)
                            redirect('/editPost')
                            }
                        }>EDIT</button>                    
                    </div>
                   
                ):(
                    <div className={style.publishedOpts}>
                    <button type='button' onClick={()=>deletePost(post.id)}>DELETE</button>
                    <button type='button'onClick={()=>{
                        handlePostData(post.id, post.title, post.content)
                        redirect('/editPost')
                        }}>EDIT</button>                    
                    </div>
                )}

            </div>
        </div>
    )
}
export{
    PostCard
}