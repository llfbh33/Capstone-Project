<<<<<<< HEAD
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import DeleteEntryFormModal from "../Modals/EntryModals/DeleteEntryModal";
import OpenModalMenuItem from "../Modals/OpenModalButton/OpenModalButton"
import EditEntryNameFormModal from "../Modals/EntryModals/EditEntryNameModal";
import EntryPreviewPage from "./EntryPreviewPage";
import EntryEditPage from "./EntryEditPage";
import './EntryPage.css'



function EntryPage() {
    const {notebookId, entryId} = useParams();
    const entry = useSelector(state => state.entries[entryId]);
    const [content, setContent] = useState('');
    const [name, setName] = useState("");
    const [isPublic, setIsPublic] = useState('Publish')
    const [isPreview, setIsPreview] = useState('Edit Entry')
    const notebook = useSelector(state => state.notebooks[notebookId])

=======
import { useEffect, useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { NavLink, useNavigate} from "react-router-dom";
import { useParams } from "react-router-dom";
import DeleteCommentModal from "../Modals/CommentModals/DeleteCommentModal";
import OpenModalMenuItem from "../Modals/OpenModalButton/OpenModalButton"
import EditCommentModal from "../Modals/CommentModals/EditCommentModal";

import './EntryPage.css'


function EntryPage() {
  const {notebookId, entryId} = useParams();
  const entry = useSelector(state => state.entries[entryId]);
  const currUser = useSelector(state => state.session.user)
  const allUsers = useSelector(state => state.users)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [name, setName] = useState("");
  const [isPublic, setIsPublic] = useState('Publish')
  const [isPreview, setIsPreview] = useState('Preview')
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const notebook = useSelector(state => state.notebooks[notebookId])


  useEffect(() =>{
    if(entry?.name) {
      setName(entry.name)
    }
    if (entry?.content) {
      setContent(entry.content)
    }
    if(entry?.is_public) {
      setIsPublic('Make Private')
    }
  }, [entry])


  const publicSwitch = () => {
    if (isPublic === 'Publish') {
      setIsPublic('Make Private')
    } else {
      setIsPublic('Publish')
    }
  }

  const handleSave = async (e) => {
    e.preventDefault();
>>>>>>> 6284ff2c8ce9df06d22eb1d4115c1d64d5b8abb2

    useEffect(() =>{
        if(entry?.name) {
          setName(entry.name)
        }
        if (entry?.content) {
          setContent(entry.content)
        }
        if(entry?.is_public) {
          setIsPublic('Make Private')
        }
    }, [entry])

<<<<<<< HEAD

    const publicSwitch = () => {
        if (isPublic === 'Publish') {
          setIsPublic('Make Private')
        } else {
          setIsPublic('Publish')
        }
=======
    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
      navigate('/')
>>>>>>> 6284ff2c8ce9df06d22eb1d4115c1d64d5b8abb2
    }

<<<<<<< HEAD
    const previewSwitch = () => {
        if (isPreview === 'Preview') {
          setIsPreview('Edit Entry')
        } else {
          setIsPreview('Preview')
        }
    }

    return (
        <div>
            <div>

                <div id='entrypage-entry-notebook-title'>
                    <h2>{`Notebook: ${notebook?.name}`}</h2>
                    <div id='entrypage-entrytitle-buttons'>
                        <h1>{`Entry: ${name}`}</h1>

                        <div className="entrypage-button-container">
                            <div className="editentry-name-button">
                                  <OpenModalMenuItem
                                  buttonText='Edit Name'
                                  modalComponent={<EditEntryNameFormModal entry={entry} />}
                                  />
                            </div>
                            <button
                                className="modal-button entry-button"
                                onClick={previewSwitch}
                                >{isPreview}
                            </button>
                            <button
                              className="modal-button entry-button"
                              onClick={(publicSwitch)}
                            >{isPublic}</button>
                            <div className="editentry-name-button">
                                <OpenModalMenuItem
                                buttonText='Delete'
                                modalComponent={<DeleteEntryFormModal entry={entry} />}
                                />
                            </div>
                        </div>
                        
                    </div>
                </div>

                <h1 id='entrypage-underline'></h1>
                <div>
                    {isPreview === 'Preview' ? <EntryEditPage entry={entry}/> : <EntryPreviewPage entry={entry} /> }
                </div>
            </div>
        </div>
    )
=======
  return (
      <div>
          {isPreview ? (
              <div>
                  <form onSubmit={handleSave}>
                      <div id='entrypage-entry-notebook-title'>
                          <h2>{`Notebook: ${notebook?.name}`}</h2>
                          <h1>{`Entry: ${name}`}</h1>
                      </div>
                      <h1 id='homepage-underline'></h1>
                      <div className="entry-content-container">
                            <div className="entry-toolbar-n-btns-container">
                              <div>
                                this is the tool bar
                              </div>
                              <div id="entry-buttons-container">
                                <button className="modal-button entry-button" type='submit'>Save</button>
                                <button
                                    className="modal-button entry-button"
                                    onClick={() => setIsPreview(false)}
                                  >Preview</button>
                                <button
                                    className="modal-button entry-button"
                                    onClick={(publicSwitch)}
                                  >{isPublic}</button>
                                <button className="modal-button entry-button">Delete</button>
                              </div>
                            </div>
                        <div className="entry-content-input-container">
                            <textarea
                                className="entry-input-area"
                                type="text"
                                rows={38}
                                cols={166}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                            />
                        </div>
                      </div>
                    </form>
                    {entry?.comments.length ?
                    <div className="entry-page-ccomments">
                      <h2>Comments on your Entry:</h2>
                      {entry.comments.map(comment => (
                        <div key={comment.id}>
                          <div className="entrypage-comment-title">
                              <div>{allUsers[comment.user_id]?.username}</div>
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
                          <div className="entrypage-comment">{comment.comment}</div>
                        </div>
                      ))}
                    </div>
                    : <h3>You have no comments on this entry</h3>}
              </div>
          ) : (
            <div>
              <div id='entrypage-entry-notebook-title'>
                  <h2>{`Notebook: ${notebook?.name}`}</h2>
                  <h1>{`Entry: ${name}`}</h1>
              </div>
              <h1 id='homepage-underline'></h1>
              <div className="entry-content-container">
                    <div className="entry-toolbar-n-btns-container">
                      <div className="hidden-font">
                        this is the tool bar
                      </div>
                      <div id="entry-buttons-container">
                        <button className="modal-button entry-button" type='submit'>Save</button>
                        <button
                            className="modal-button entry-button"
                            onClick={() => setIsPreview(true)}
                          >Edit</button>
                        <button
                            className="modal-button entry-button"
                            onClick={(publicSwitch)}
                          >{isPublic}</button>
                        <button className="modal-button entry-button">Delete</button>
                      </div>
                    </div>
                <div className="entry-content-container">
                  <div>{content}</div>
                </div>
                </div>
            </div>
            )}
      </div>

  )
>>>>>>> 6284ff2c8ce9df06d22eb1d4115c1d64d5b8abb2
}

export default EntryPage;
