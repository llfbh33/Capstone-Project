import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
// import OpenModalMenuItem from "../Modals/OpenModalButton/OpenModalButton"
import OpenModalMenuItem from "../Modals/OpenModalButton/OpenModalMenuItem"
import DeleteCommentModal from "../Modals/CommentModals/DeleteCommentModal";
import EditCommentModal from "../Modals/CommentModals/EditCommentModal";
import { thunkCreateComment } from "../../redux/comments";
import parser from 'html-react-parser'
import { BsTrash3Fill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { friendlyDate } from "../../utils/utils";



function PublicPost() {
    const { postId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allUsers = useSelector(state => state.users)
    // const allPosts = useSelector(state => state.posts)
    const post = useSelector(state => state.posts[postId]);
    const creator = useSelector(state => state.users[post?.user_id]);
    const currUser = useSelector(state => state.session.user);
    const [comment, setComment] = useState('');
    const [commentList, setCommentList] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [active] = useState(post?.is_active);
    const notActive = "Post content is currently unavailable"


    useEffect(() => {
        if (post?.comments) {
            const listComments = [...post.comments].reverse()
            setCommentList(listComments)
        }

    }, [post])

    useEffect(() => {
        if (post?.entry) {
            setLoaded(true)
        }
    }, [post])

    const handleComment = async (e) => {
        e.preventDefault()

        if (comment.length <= 0 || comment.length > 600) {
            return
        }

        const newComment = {
            userId: currUser.id,
            postId: post.id,
            comment: comment
        }
        console.log(newComment)

        setComment('');
        await dispatch(thunkCreateComment(newComment));
        return
    }


    if (loaded) {
        return (
            <div className="Page-container page-grow">
                <div className="navigation-tabs-container" id="helper_page_navigation">
                    <div className="navigation-tabs" onClick={() => navigate('/public')}>Public Feed</div>
                    <div className="navigation-intermediary">{`>`}</div>
                    <div className="navigation-tabs" onClick={() => navigate(`/public/${postId}`)}>{post.title.length > 30 ? `${post.title.slice(0, 30)}...` : post.title}</div>
                </div>
                <div className="post-heading-container">
                    <h1>{`${post?.title} by ${creator?.username}`}</h1>
                    <p>{friendlyDate(post?.updated_at)}</p>
                </div>

                <div className="section-layout section-col">
                    <div className="content-panel">
                        {post?.message}
                    </div>
                    <div className="content-panel">
                        <p className="post-content">{active ? parser(post.entry.content) : notActive}</p>
                    </div>

                    <form onSubmit={handleComment}>
                        <div className=''>
                            <p className="">{`Let ${creator?.username} know what you think about their writing!`}</p>
                            <div className="comment-text-area">
                                <textarea
                                    type='text'
                                    // rows={4}
                                    // cols={140}
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                />
                            </div>
                            <p className={comment.length > 600 || comment.length <= 0 ? 'post-comment-errors' : 'post-comment-no-errors'}>{`${comment.length}/600`}</p>
                        </div>
                        <div className="post-comment-btn-container-singular">
                            <button type='submit' className="modal-button">Comment</button>
                        </div>
                    </form>
                </div>
                {commentList.length ?
                    <div className="publicpost-comment-container">
                        <h2>Comments:</h2>
                        {commentList.map(comment => (
                            <div key={comment.id} className="singular-post-container">
                                <div className="public-post-comment-title-singular">
                                    <div className="user-info-for-comment-singular">
                                        <img src={allUsers[comment.user_id]?.profile_image} />
                                        <div>{allUsers[comment.user_id]?.username}</div>
                                    </div>
                                    <div className="notebook-icon-container">
                                        {comment.user_id === currUser.id
                                            ? <div className="icon-container" >
                                                <OpenModalMenuItem
                                                    itemText={<FaEdit />}
                                                    modalComponent={<EditCommentModal comment={comment} />}
                                                />
                                            </div>
                                            : ''}
                                        {post?.user_id === currUser.id || comment.user_id === currUser.id
                                            ? <div className="icon-container" >
                                                <OpenModalMenuItem
                                                    itemText={<BsTrash3Fill />}
                                                    modalComponent={<DeleteCommentModal commentId={comment.id} />}
                                                />
                                            </div>
                                            : ''}
                                    </div>
                                </div>
                                <div className="singular-post-comment">{comment.comment}</div>
                            </div>

                        ))}
                    </div>
                    : <h3>Be the first to leave a comment!</h3>}
                <div className="singular-space-container"></div>
            </div>
        )
    }
}

export default PublicPost
