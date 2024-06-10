import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
// import OpenModalMenuItem from "../Modals/OpenModalButton/OpenModalButton"
import OpenModalMenuItem from "../Modals/OpenModalButton/OpenModalMenuItem"
import DeleteCommentModal from "../Modals/CommentModals/DeleteCommentModal";
import EditCommentModal from "../Modals/CommentModals/EditCommentModal";
import { thunkCreateComment, thunkLoadEntries } from "../../redux/entry";
import parser from 'html-react-parser'
import { BsTrash3Fill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";



function PublicPost() {
    const { postId } = useParams();
    const dispatch = useDispatch();
    const post = useSelector(state => state.entries[postId]);
    const creator = useSelector(state => state.users[post?.user_id]);
    const allUsers = useSelector(state => state.users);
    const currUser = useSelector(state => state.session.user);
    const [comment, setComment] = useState('');
    const [commentList, setCommentList] = useState([])
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (post?.comments) {
            const listComments = [...post.comments].reverse()
            setCommentList(listComments)
        }

    }, [post])

    useEffect(() => {
        if (post) {
            setLoaded(true)
        }
    }, [post])

    const handleComment = async(e) => {
        e.preventDefault()

        if (comment.length <= 0 || comment.length > 600) {
            return
        }

        const newComment = {
            userId: currUser.id,
            entryId: post.id,
            comment: comment
        }

        setComment('');
        await dispatch(thunkCreateComment(newComment));
        await dispatch(thunkLoadEntries());
        return
    }

    if (loaded) {
    return (
        <div className="public-post-singular">
            <p className='mini-page-title' ></p>
            <div className="public-post-title-singular">
                <h1 className="public-feed-title">Public Feed</h1>
                <h1 className="wrap-name-post-singular">{`${post?.name} by ${creator?.username}`}</h1>
            </div>
            <div className="public-post-content-container-singular">
                <p className="post-content">{parser(post.content)}</p>
            </div>
            <div className='public-post-message-container-singular'>
                <div>
                    <p>{`Posted on: ${post?.post.created_at.slice(0, 17)}`}</p>
                    <h3>{`Message from ${creator?.username}:`}</h3>
                </div>
                <div className="message-container-singular">
                    <p className="message-element">{post?.post.message}</p>
                </div>
            </div>
            <div className="space-maker-div"></div>

            <form onSubmit={handleComment}>
                <div className='public-post-comment-form-singular'>
                    <p className="public-post-small-label">{`Let ${creator?.username} know what you think about their writing!`}</p>
                    <div className="public-post-comment-input-area">
                        <textarea
                            type='text'
                            rows={4}
                            cols={140}
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
                                <div className="edit-delete-btns-singular">
                                {comment.user_id === currUser.id
                                    ? <div className="homepage-edit-notebook" >
                                    <OpenModalMenuItem
                                        itemText={<FaEdit />}
                                        modalComponent={<EditCommentModal comment={comment} />}
                                    />
                                </div>
                                     : ''}
                                {post?.user_id === currUser.id || comment.user_id === currUser.id
                                    ? <div className="homepage-edit-notebook" >
                                        <OpenModalMenuItem
                                            itemText={<BsTrash3Fill />}
                                            modalComponent={<DeleteCommentModal comment={comment} />}
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
