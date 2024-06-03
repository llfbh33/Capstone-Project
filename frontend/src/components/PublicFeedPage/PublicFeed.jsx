import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import OpenModalMenuItem from "../Modals/OpenModalButton/OpenModalButton"
import RemovePostModal from "../Modals/PostModals/RemovePostModal"
import './PublicFeed.css'
import { useNavigate } from "react-router-dom"
import parser from 'html-react-parser'

function PublicFeed() {
    const allEntries = useSelector(state => state.entries)
    const allUsers = useSelector(state => state.users)
    const [posts, setPosts] = useState(Object.values(allEntries).filter(entry => entry.is_public === true))
    const currUser = useSelector(state => state.session.user)
    const navigate = useNavigate()

    useEffect(() => {
        setPosts(Object.values(allEntries).filter(entry => entry.is_public === true))
    }, [allEntries])

    return (
        <div>
            <p>Read what others have written and give them advice.  Remember to be respectful.</p>
            <div id="publicfeed-title">
                <h1>Public Feed</h1>
                <h1>All Entries</h1>
            </div>

            <div>
                {posts.map(post => (
                    <div key={post.id} className="postfeed-post-container">
                        <div className="post-name-and-user-container">
                            <h3>{post.name}</h3>
                            <div className="post-username-image-container">
                                <img src={allUsers[post.user_id]?.profile_image} className="post-profile-image"/>
                                <h3>{allUsers[post.user_id]?.username}</h3>
                                {post.user_id === currUser.id
                                  ? <div className="postfeed-remove-post-button">
                                        <OpenModalMenuItem
                                        buttonText="Remove post?"
                                        modalComponent={<RemovePostModal post={post} />}
                                        />
                                    </div>
                                : ''}
                            </div>
                        </div>
                        <div className="small-post-container" onClick={() => navigate(`/public/${post.id}`)}>
                            <p className="small-post-content">{parser(post.content)}</p>
                        </div>
                        <div className="post-bottom-border"></div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PublicFeed
