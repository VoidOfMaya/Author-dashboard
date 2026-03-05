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
            <div className={style.published}>{post.isPublished? reformatDate(post.publishedAt) : 'PENDING'}</div>
            <div className={style.opts}>
                {!post.isPublished? (
                    <div className={style.pendingOpts}>
                        <button type='button'><h5>PUBLISH</h5></button>
                        <button type='button'><h5>DELETE</h5></button>
                        <button type='button'><h5>EDIT</h5></button>                    
                    </div>
                   
                ):(
                    <div className={style.publishedOpts}>
                    <button type='button'><h5>DELETE</h5></button>
                    <button type='button'><h5>EDIT</h5></button>                    
                    </div>
                )}

            </div>
        </div>
    )
}
export{
    PostCard
}