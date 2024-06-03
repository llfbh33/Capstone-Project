<<<<<<< HEAD
import { useParams} from "react-router-dom";
import { useSelector} from "react-redux";
import { useEffect, useState } from "react";
import parser from 'html-react-parser'

import DeleteCommentModal from "../Modals/CommentModals/DeleteCommentModal";
import OpenModalMenuItem from "../Modals/OpenModalButton/OpenModalButton"
import EditCommentModal from "../Modals/CommentModals/EditCommentModal";


function EntryPreviewPage() {

    const { entryId } = useParams();
    const entry = useSelector(state => state.entries[entryId]);
    const allUsers = useSelector(state => state.users);
    const currUser = useSelector(state => state.session.user);
    const [loaded, setLoaded] = useState(false)

    // const lookPreview = () => {
    //     console.log('not working?')
    //     navigate(`/notebook/${notebookId}/entries/${entryId}/edit`)
    // }

    useEffect(() => {
        if (entry) {
            setLoaded(true)
        }
    }, [entry])


    if (loaded) {
    return (
        <div className="entry-preview-content-container">

            {entry.content
            ? <div>
                <div id='entry-preview-content' type='HTML'>{entry.content ? parser(entry.content) : ''}</div>
            </div>
            : <p>{`It looks like you havn't written anything yet.  Click on the edit entry button to get started!`}</p>}

            <h1 id='entrypage-underline'></h1>
            <div>
                {entry.comments.length
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
    )}
}


export default EntryPreviewPage
=======
// import { useEffect, useState } from "react";
// import { thunkLogin } from "../../redux/session";
// import { useDispatch, useSelector } from "react-redux";
// import { useModal } from "../../context/Modal";

// function EntryPreviewPage() {

//     const {notebookId, entryId} = useParams();
//     const entry = useSelector(state => state.entries[entryId]);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const [content, setContent] = useState('');
//     const [name, setName] = useState("");
//     const [isPublic, setIsPublic] = useState('Publish')
//     const [errors, setErrors] = useState({});
//     const { closeModal } = useModal();
//     const notebook = useSelector(state => state.notebooks[notebookId])

//     return (
//         <div>
//         <form onSubmit={handleSave}>
//           <div id='entrypage-entry-notebook-title'>
//               <h2>{`Notebook: ${notebook?.name}`}</h2>
//               <h1>{`Entry: ${entry?.name}`}</h1>
//           </div>
//           <h1 id='homepage-underline'></h1>
//           <div className="entry-content-container">

//                 <div className="entry-toolbar-n-btns-container">
//                   <div>
//                     this is the tool bar
//                   </div>
//                   <div id="entry-buttons-container">
//                     <button className="modal-button entry-button" type='submit'>Save</button>
//                     <NavLink
//                         to='/notebook/:notebookId/entries/:entryId/preview'
//                         className="modal-button entry-button"
//                       >Preview</NavLink>
//                     <button
//                         className="modal-button entry-button"
//                         onClick={(publicSwitch)}
//                       >{isPublic}</button>
//                     <button className="modal-button entry-button">Delete</button>
//                   </div>
//                 </div>
//           <div className="entry-content-input-container">
//             <div>{entry?.content}</div>
//           </div>
//           </div>
//           </form>
//     </div>
//     )
// }


// export default EntryPreviewPage
>>>>>>> 6284ff2c8ce9df06d22eb1d4115c1d64d5b8abb2
