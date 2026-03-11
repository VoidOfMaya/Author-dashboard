import { useRef, useState, useEffect } from "react";
import { Editor } from '@tinymce/tinymce-react'
import { useNavigate, useOutletContext } from "react-router-dom";
import { ButtonLoading } from '../loading/load.jsx'
function EditPost(){
    const { token, postData} = useOutletContext();
    const [post, setPost]= useState({title: postData.title, content: postData.content})
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
        
        fetch(`${import.meta.VITE_API_URL}/post/update/${postData.id}`,{
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({title: post.title, content: post.content})

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
            redirect('/dashboard')
        });
        
    }catch(err){
        console.log(err)
    }
    },[submition,])
    return(
        <div>
            <form style={{marginTop: '2em'}}>
                <input value={post.title}
                onChange={(e)=>setPost(prev =>({...prev, title: e.target.value}))}
                ></input>
            
                <div style={{marginTop: '2em'}}>
                    <Editor
                        apiKey={import.meta.VITE_EDITOR_KEY}
                        onInit={(_evt, editor)=> editRef.current = editor}
                        initialValue={post.content}
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
                            >Submit edit</button>                            
                            </>
                        )}                

                </div>
            </form>
        </div>
    )
}
export{
    EditPost,
}