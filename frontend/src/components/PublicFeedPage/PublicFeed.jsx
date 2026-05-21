import { useSelector } from "react-redux"
import { useEffect, useState, useMemo } from "react"
import OpenModalMenuItem from "../Modals/OpenModalButton/OpenModalMenuItem"
import RemovePostModal from "../Modals/PostModals/RemovePostModal"
import './PublicFeed.css'
import { useNavigate } from "react-router-dom"
import parser from 'html-react-parser'
import { BsTrash3Fill } from "react-icons/bs";


function PublicFeed() {
    const allEntries = useSelector(state => state.entries)
    const postsObj = useSelector(state => state.posts)
    const allUsers = useSelector(state => state.users)
    const posts = useMemo(() => {
        return Object.values(postsObj).sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
    }, [postsObj]);
    const currUser = useSelector(state => state.session.user)
    const navigate = useNavigate()


    // useEffect(() => {

    //     const sortedPosts = Object.values(allPosts)
    //         .sort((a, b) =>
    //             new Date(b.updated_at) - new Date(a.updated_at)
    //         );
    //     setPosts(sortedPosts)
    // }, [allPosts])


    return (
        <div className="public-feed-main-container">
            {/* <p className='mini-page-explination'>Read what others have written and give them advice.  Remember to be respectful.</p> */}
            {/* <div className="publicfeed-post-title"> */}
            <h1 className='title page-title'>Public Feed</h1>
            <h2 className="title page-subtitle">All Entries</h2>
            {/* </div> */}

            <div className="public-post-content-container">
                {posts.map(post => (
                    <div key={post.id} className="postfeed-post-container">
                        <div className="post-name-and-user-container">
                            <h3 className="post-name">{post.title}</h3>
                            <div className="post-username-image-container">
                                <div className="image-and-username">

                                    <img src={allUsers[post.entry.user_id]?.profile_image} className="post-profile-image" />
                                    <h3>{allUsers[post.entry.user_id]?.username}</h3>
                                </div>
                                {post?.entry && post?.entry?.user_id === currUser.id
                                    ? <div className="homepage-edit-notebook">
                                        <OpenModalMenuItem
                                            itemText={<BsTrash3Fill />}
                                            modalComponent={<RemovePostModal post={post} />}
                                        />
                                    </div>
                                    : ''}

                            </div>
                        </div>
                        <div className="small-post-container" onClick={() => navigate(`/public/${post.id}`)}>
                            <div className="small-post-content">{post.message}</div>
                        </div>
                        <div className="post-seporating-bottom-border"></div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PublicFeed
