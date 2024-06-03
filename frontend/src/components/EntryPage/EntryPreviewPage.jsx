
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import DeleteCommentModal from "../Modals/CommentModals/DeleteCommentModal";
import OpenModalMenuItem from "../Modals/OpenModalButton/OpenModalButton"
import EditCommentModal from "../Modals/CommentModals/EditCommentModal";
import parser from 'html-react-parser'



function EntryPreviewPage() {

    const {notebookId, entryId} = useParams();
    const entry = useSelector(state => state.entries[entryId]);
    const allUsers = useSelector(state => state.users);
    const currUser = useSelector(state => state.session.user);
    const navigate = useNavigate()

    // const lookPreview = () => {
    //     console.log('not working?')
    //     navigate(`/notebook/${notebookId}/entries/${entryId}/edit`)
    // }

    return (
        <div className="entry-preview-content-container">

            <div>
                <div id='entry-preview-content' type='HTML'>{entry.content ? parser(entry?.content) : ''}</div>
            </div>
            <div>
                {entry?.comments.length
                ? <div>
                    <h2>Comments on your Entry:</h2>
                    {entry?.comments.map(comment => (
                        <div key={comment.id}>
                            <div className="entrypage-comment-title">
                                <div>
                                    {allUsers[comment.user_id]?.username}
                                </div>
                                <div>
                                    {comment.user_id === currUser.id
                                    ? <div className="entrypage-delete-comment" >
                                        <OpenModalMenuItem
                                        buttonText="Edit Comment"
                                        modalComponent={<EditCommentModal comment={comment} />}
                                        />
                                    </div>
                                    : ''}
                                    <div className="entrypage-delete-comment" >
                                        <OpenModalMenuItem
                                        buttonText="Delete Comment"
                                        modalComponent={<DeleteCommentModal comment={comment} />}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="entrypage-comment">
                                {comment.comment}
                            </div>
                        </div>
                    ))}
                </div>
                : <h3>You have no comments on this entry</h3>}
            </div>
        </div>
    )
}


export default EntryPreviewPage
