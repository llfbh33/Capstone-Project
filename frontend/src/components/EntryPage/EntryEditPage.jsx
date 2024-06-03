import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useNavigate} from "react-router-dom";
import { useParams } from "react-router-dom";
// import DeleteCommentModal from "../Modals/CommentModals/DeleteCommentModal";
// import OpenModalMenuItem from "../Modals/OpenModalButton/OpenModalButton"
// import EditCommentModal from "../Modals/CommentModals/EditCommentModal";
// import { EditorProvider, FloatingMenu, BubbleMenu, EditorContent, useEditor } from '@tiptap/react'
// import StarterKit from '@tiptap/starter-kit'
import TipTap from "../TipTap/TipTap";

import './EntryPage.css'
import { thunkEditEntry } from "../../redux/entry";
import SaveEntryModal from "../Modals/EntryModals/SaveEntryModal";


function EntryEditPage() {
  const {notebookId, entryId, entries} = useParams();
  const entry = useSelector(state => state.entries[parseInt(entryId)]);
  const currUser = useSelector(state => state.session.user)
  const allUsers = useSelector(state => state.users)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [content, setContent] = useState(entry.content);
  const [name, setName] = useState("");
  const [isPublic, setIsPublic] = useState('Publish')
  const [isPreview, setIsPreview] = useState('Preview')
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const notebook = useSelector(state => state.notebooks[notebookId])
  const { setModalContent, setOnModalClose } = useModal();

    const refOne = useRef(null)

    // if (refOne === null) {
    //     document.removeEventListener('click', outsideClick)
    // }

    // useEffect(() => {
    //     if (content && entry?.content !== content) {
    //         document.addEventListener('click', outsideClick, true)
    //       // ment to remove the event listener but it is not quite working
    //     }
    //     return document.removeEventListener('click', outsideClick)

    // }, [content])

    // // works but is messy - find a way to isolate buttons only?
    // const outsideClick = (e) => {
    //     if(refOne !== null && !refOne.current.contains(e.target)) {
    //         const modalComponent =<SaveEntryModal  entry={entry} content={content}/>
    //         setModalContent(modalComponent);
    //     }
    //     return document.removeEventListener('click', outsideClick)
    // }

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

    const serverResponse = await dispatch(thunkEditEntry ({
        id: entry.id,
        userId: currUser.id,
        notebookId: parseInt(notebookId),
        name: entry.name,
        content,
        isPublic: entry.is_public
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      document.removeEventListener('click', outsideClick)
      closeModal();
    }
  };

  const lookPreview = () => {
    console.log('not working?')
    navigate(`/notebook/${notebookId}/entries/${entryId}/preview`)
}



  return (
        <div ref={refOne} id='editentry-main-container'>
            <form onSubmit={handleSave}>
                <div id='entryedit-toolbar-container'>
                    <div>This is where the tool bar goes</div>
                    <div id='editentry-save-btn-container' >
                        <p>{content === entry.content ? 'Saved' : ''}</p>
                        <button className="modal-button entry-button" type='submit'>Save</button>
                    </div>
                </div>
                <div className="entry-content-container">
                  <TipTap content={content} setContent={setContent}/>
                </div>
            </form>
        </div>
    )
}

export default EntryEditPage;
