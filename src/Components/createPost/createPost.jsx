import { useRef, useState, useEffect } from "react";
import { Editor } from '@tinymce/tinymce-react'
import { useNavigate, useOutletContext } from "react-router-dom";
import { ButtonLoading } from '../loading/load.jsx'
function CreatePost(){
    const { token, user, callError } = useOutletContext();
    const [post, setPost]= useState({title: '', content: ''})
    const [submition,setSubmition]= useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const redirect = useNavigate();

    const editRef = useRef(null);
    
    const log = async() => {
        if (editRef.current) {
            const content = editRef.current.getContent()
            setPost(prev=>({...prev, content: content }))
            setSubmition(true)
            setIsLoading(true)
        }
    }
    useEffect(()=>{
    if(!submition) return;
    try{
        
        fetch('https://blog-api-vdtu.onrender.com/post/',{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({title: post.title, content: post.content})

        })
        .then(response=>{
        if(response.status >= 400) {
            throw new Error(`${response.status}, ${response.error}`|| `${response.status}, error, could not preform function`)
        }
        return response.json();
        })
        .catch(error => { throw new Error(error)})
        .finally(()=> {
            setIsLoading(false)
            redirect('/dashboard')
        });
        
    }catch(err){
        callError(err.message)
    }
    },[submition,])
    return(
        <div>
            <form style={{marginTop: '2em'}}>
                <input placeholder="Title"
                onChange={(e)=>setPost(prev =>({...prev, title: e.target.value}))}
                ></input>
            
                <div style={{marginTop: '2em'}}>
                    <Editor
                        apiKey= 'pddw3x1mb6z8a1k4uou87uajvvsuqklkxmhny99spd0h9xbj'
                        onInit={(_evt, editor)=> editRef.current = editor}
                        initialValue="<p>Post content goes here</p>"
                        init={{
                            height: 1000,
                            menubar:false,
                            plugins:[
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount',
                            ],
                            toolbar: 'undo redo | blocks|' + 
                                'bold italic forecolor | alignleft aligncenter | font size' +
                                'alignright alignjusdtify | bullsit numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body{ font-family:Helvetica,Arial,sans-serif; font-size:14px}'
                        }}   
                        />
                        {isLoading ? (
                            <>
                                <ButtonLoading />
                            </>
                        ):(
                            <>
                            <button type="button" 
                            onClick={(e)=>{
                                e.preventDefault();
                                log()
                                }
                            }
                            >Submit</button>                            
                            </>
                        )}                

                </div>
            </form>
        </div>
    )
}
export{
    CreatePost
}