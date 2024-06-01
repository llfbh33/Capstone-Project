import { useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

function PublicPost() {
    const { postId } = useParams()
    const post = useSelector(state => state.entries[postId])
    const creator = useSelector(state => state.users[post.user_id])
    const [comment, setComment] = useState('')
    console.log(postId)

    const handleComment = (e) => {
        e.preventDefault()
        console.log('hello, still working on this')
    }

    return (
        <div>
            <div id="public-post-title">
                <h1>Public Feed</h1>
                <h1>{`${post.name} by ${creator.username}`}</h1>
            </div>
            <div className="post-content-container">
                <p className="post-content">{post.content}</p>
            </div>
            <div className='post-message-container'>
                <div>
                    <p>{`Posted on: ${post.post.created_at.slice(0, 17)}`}</p>
                    <p>{`Message from ${creator.username}:`}</p>
                </div>
                <div className="message-container">
                    <p className="message-element">{post.post.message}</p>
                </div>
            </div>
            <form onSubmit={handleComment}>
                <div>
                    <p>{`Let ${creator.username} know what you think about their writing!`}</p>
                    <div>
                        <button type='submit'>Comment</button>
                        <textarea
                        type='text'
                        rows={4}
                        cols={140}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default PublicPost
