import { useState, useEffect } from "react"
import { Loading } from "../loading/load";
import { Link, useOutletContext } from "react-router-dom";
import style from './dashboard.module.css'
import { PostCard } from "../postCard.jsx/postCard";

function Dashboard(){
    const[loading, setLoading] = useState(true);
    const [posts, setPosts] = useState();

    const{user, token} = useOutletContext();
    useEffect(()=>{
        try{
            fetch('https://blog-api-vdtu.onrender.com/post/All',{
                method: 'GET',
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
            .then( data =>{
                setPosts(data.result)
            })
            .catch(error => console.error(error))
            .finally(()=> {setLoading(false)});
        }catch(err){
            console.log(err)
        }

    },[])
    //console.log(posts)
    const populatePosts=(postArray)=>{
        return postArray.map(post=>{
            return <PostCard key={post.id} post={post}/>
        })
    }
    if(loading){
        return(
            <div>
                <h1>Posts:</h1>
                <Loading />
            </div>
        )
    }
    return(
        <section>
            <h1>Posts:</h1>
            <div className={style.postList}>
                <div className={style.tableHeaders} style={{borderBottom: '1px solid black', padding: '10px'}}>
                    <div className={style.id}>ID</div>
                    <div className={style.name}>NAME</div>
                    <div className={style.creation}>CREATED AT</div>
                    <div className={style.published}>PUBLISH STATUS</div>
                    <div className={style.opts}>OPTIONS</div>
                </div>
                {populatePosts(posts)}
            </div>

            <Link to={'/createPost'}>newPost +</Link>
        </section>
    )
}
export{
    Dashboard
}