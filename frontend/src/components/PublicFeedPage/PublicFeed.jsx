import { useSelector } from "react-redux"
import { useMemo } from "react"
import OpenModalMenuItem from "../Modals/OpenModalButton/OpenModalMenuItem"
import RemovePostModal from "../Modals/PostModals/RemovePostModal"
import './PublicFeed.css'
import { useNavigate } from "react-router-dom"
// import parser from 'html-react-parser'
import { BsTrash3Fill } from "react-icons/bs";
import { friendlyDate } from "../../utils/utils"
import { MdLocalPostOffice } from "react-icons/md";


function PublicFeed() {
    // const allEntries = useSelector(state => state.entries)
    const postsObj = useSelector(state => state.posts)
    const allUsers = useSelector(state => state.users)
    const posts = useMemo(() => {
        return Object.values(postsObj).sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
    }, [postsObj]);
    const currUser = useSelector(state => state.session.user)
    const navigate = useNavigate()


    const handleReadLength = (count) => {
        let difficulty;

        if (count < 500) difficulty = 'short';
        else if (count >= 500 && count < 1500) difficulty = 'medium';
        else difficulty = 'long';

        return difficulty;
    }

    console.log(posts)


    return (
        <div className="page-container page-static">
            <div className="header-flex-col">
                <h1>Public Feed</h1>
                <p>Discover what others are wrighting. A community of stories, thoughts, and ideas.</p>
            </div>
            <div className="section-layout section-col">

                <div className="content-panel panel-col">
                    <div className="section-layout section-row">
                        <div>search</div>
                        <div>lengths</div>
                        <div>sort</div>
                    </div>
                    <div className="section-layout section-row">
                        <div>all filter buttons</div>
                        <div>short read</div>
                        <div>med read</div>
                        <div>long read</div>
                    </div>
                </div>

                <div className="section-layout section-col">
                    <div className='entries-list-section'>
                        <div className='entry-scroll-contain'>
                            <div className="entry-list-scroll">
                                {posts.map(post => (
                                    <div className="content-panel panel-col clickable-item" key={post.id}>
                                        <div className="flex-row flex-space-between">
                                            <div className="flex-row username-image-container">
                                                <img src={allUsers[post.user_id].profile_image}
                                                    className="post-profile-image"
                                                />
                                                <p>{allUsers[post.user_id].username}</p>
                                            </div>
                                            <p>{friendlyDate(post.updated_at)}</p>
                                        </div>
                                        <h3 className="remove-margin">{post.title}</h3>
                                        <p>{post.message}</p>
                                        <div className="flex-row flex-space-between">
                                            <div className="flex-row" style={{gap: "30px"}}>
                                                {post.show_read_length && <div>{handleReadLength(post.entry.read_length)}</div>}
                                                <div><MdLocalPostOffice />{` ${post.comments.length} Comments`}</div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default PublicFeed





{/* <p className='mini-page-explination'>Read what others have written and give them advice.  Remember to be respectful.</p> */ }
{/* <div className="publicfeed-post-title"> */ }
// <h1 className='title page-title'>Public Feed</h1>
// <h2 className="title page-subtitle">All Entries</h2>
{/* </div> */ }

// <div className="public-post-content-container">
// {posts.map(post => (
// <div key={post.id} className="postfeed-post-container">
// <div className="post-name-and-user-container">
// <h3 className="post-name">{post.title}</h3>
// <div className="post-username-image-container">
// <div className="image-and-username">

// <img src={allUsers[post?.user_id]?.profile_image} className="post-profile-image" />
// <h3>{allUsers[post?.user_id]?.username}</h3>
// </div>
// {post?.entry && post?.user_id === currUser.id
// ? <div className="homepage-edit-notebook">
// <OpenModalMenuItem
// itemText={<BsTrash3Fill />}
// modalComponent={<RemovePostModal post={post} />}
// />
// </div>
// : ''}

// </div>
// </div>
// <div className="small-post-container" onClick={() => navigate(`/public/${post.id}`)}>
// <div className="small-post-content">{post.message}</div>
// </div>
// <div className="post-seporating-bottom-border"></div>
// </div>
// ))}
// </div>

