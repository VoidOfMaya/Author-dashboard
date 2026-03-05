import { useRef } from "react";
import { Editor } from '@tinymce/tinymce-react'
function CreatePost(){


    const editRef = useRef(null);
    const log = () => {
    if (editRef.current) {
      console.log(editRef.current.getContent());
    }
  };
    return(
        <div>
            <form style={{marginTop: '2em'}}>
                <input placeholder="Title"></input>
            </form>
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
            </div>
 
            <button type="button" onClick={log}>log editor content</button>
        </div>
    )
}
export{
    CreatePost
}