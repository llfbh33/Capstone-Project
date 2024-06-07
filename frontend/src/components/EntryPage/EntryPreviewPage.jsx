import { useParams} from "react-router-dom";
import { useSelector} from "react-redux";
import { useEffect, useState } from "react";
import { BsTrash3Fill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import parser from 'html-react-parser'

import DeleteCommentModal from "../Modals/CommentModals/DeleteCommentModal";
import OpenModalMenuItem from "../Modals/OpenModalButton/OpenModalMenuItem"
import EditCommentModal from "../Modals/CommentModals/EditCommentModal";


function EntryPreviewPage() {

    const { entryId } = useParams();
    const entry = useSelector(state => state.entries[entryId]);
    const allUsers = useSelector(state => state.users);
    const currUser = useSelector(state => state.session.user);
    const [loaded, setLoaded] = useState(false)


    useEffect(() => {
        if (entry) {
            setLoaded(true)
        }
    }, [entry])


    if (loaded) {
    return (
        <div className="entry-preview-content-container">

            {entry?.content
            ? <div className="entry-preview-content-container">
                <div id='entry-preview-content' type='HTML'>{entry.content ? parser(entry.content) : ''}</div>
            </div>
            : <p id='entry-preview-content'>{`It looks like you havn't written anything yet.  Click on the edit entry button to get started!`}</p>}

            {entry?.content === '<p></p>' && <p>{`It looks like you havn't written anything yet.  Click on the edit entry button to get started!`}</p>}

            <h1 className='entrypage-underline'></h1>
            <div>
                {entry?.comments
                ? <div>
                    <h2>Comments on your Entry:</h2>
                    {entry?.comments.map(comment => (
                        <div key={comment.id}>

                            <div className="entrypage-comment-title">
                                <div className="post-user-container">
                                    <img src={allUsers[comment.user_id]?.profile_image} />
                                    <div>{allUsers[comment.user_id]?.username}</div>
                                </div>
                                <div>
                                    {comment.user_id === currUser.id
                                    ? <div className="homepage-edit-notebook" >
                                        <OpenModalMenuItem
                                        itemText={<FaEdit />}
                                        modalComponent={<EditCommentModal comment={comment} />}
                                        />
                                    </div>
                                    : ''}
                                    <div className="homepage-edit-notebook" >
                                        <OpenModalMenuItem
                                        itemText={<BsTrash3Fill />}
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
            <h1 className='entrypage-underline'></h1>
        </div>
    )}
}


export default EntryPreviewPage
