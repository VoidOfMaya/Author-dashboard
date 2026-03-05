import style from './postcard.module.css'
function PostCard({post}){

    const reformatDate =(date)=>{
        return new Date(date).toLocaleDateString("en-US", {
            weekday: "short",   // Mon, Tue, ...
            year: "numeric",    // 2026
            month: "short",     // Mar
            day: "numeric"      // 2
    });
    }
    return(
        <div className={style.tableItem}>
            <div className={style.id}>{post.id}</div>
            <div className={style.name}>{post.title}</div>
            <div className={style.creation}>{reformatDate(post.createdAt)}</div>
            <div className={style.published}>{post.isPublished? reformatDate(post.publishedAt) : 'NOT PUBLISHED'}</div>
            <div className={style.opts}>
                {post.isPublished? (
                    <>
                        <button type='button'>PUBLISH</button>
                        <button type='button'>DELETE</button>
                        <button type='button'>EDIT</button>                    
                    </>
                   
                ):(
                    <>
                    <button type='button'>DELETE</button>
                    <button type='button'>EDIT</button>                    
                    </>
                )}

            </div>
        </div>
    )
}
export{
    PostCard
}