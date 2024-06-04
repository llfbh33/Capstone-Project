//imports for text editor
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import StarterKit from '@tiptap/starter-kit'
import { useEditor, EditorContent } from '@tiptap/react'

import { useNavigate, useParams} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";

import { thunkEditEntry } from "../../redux/entry";
import { useModal } from "../../context/Modal";
import MenuBar from "../TipTap/TipTap";
import './EntryPage.css'



function EntryEditPage() {
    const { entryId } = useParams();
    const entry = useSelector(state => state.entries[parseInt(entryId)]);
    // const allUsers = useSelector(state => state.users)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [content, setContent] = useState(entry.content);
    const [validationErrors, setValidationErrors] = useState({});
    const { closeModal } = useModal();
    // const notebook = useSelector(state => state.notebooks[notebookId])
    // const { setModalContent, setOnModalClose } = useModal();

    const refOne = useRef(null)

    useEffect(() => {
      // if the content of the entry does not equal the content state
        if (entry?.content !== content) {
          // set a document wide event listener onClick to activate the function outsideClick
            document.addEventListener('click', outsideClick, true)
          // else entry.content equals content
        } else {
          // then remove the event listener from the document
          document.removeEventListener('click', outsideClick)
        }
    // activate this useEffect if there is a change in content
    }, [content])

    // activated if click on the document after entry.content and content are not the same
    const outsideClick = (e) => {
      // if the referenced div does not contain the target of the click
        if(!refOne.current.contains(e.target)) {
          // save the value of content to the entry
            handleSave()
            // const modalComponent =<SaveEntryModal  entry={entry} content={content}/>
            // setModalContent(modalComponent);
        }
        return document.removeEventListener('click', outsideClick)
    }


// necessary extentions for use of the tool bar
    const extensions = [
        Underline,
        Color.configure({ types: [TextStyle.name, ListItem.name] }),
        TextStyle.configure({ types: [ListItem.name] }),
        StarterKit.configure({
            bulletList: {
                keepMarks: true,
                keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
            },
            orderedList: {
                keepMarks: true,
                keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
            },

        }),
    ]

// editor necessary to make the toolbar interactive
    const editor = useEditor({
        extensions,
        content: content,
        onUpdate: ({editor}) => {
            const html = editor.getHTML()
            setContent(html);
        }
    })


    const handleSave = async (e) => {
        if (e) e.preventDefault();

    const serverResponse = await dispatch(thunkEditEntry ({
        id: entry.id,
        userId: entry.user_id,
        notebookId: entry.notebook_id,
        name: entry.name,
        content,
        isPublic: entry.is_public
        })
    );

        if (serverResponse) {
            setValidationErrors(serverResponse);
        } else {
            document.removeEventListener('click', outsideClick)
            closeModal();
        }
    };


    return (
        <div ref={refOne} className='editentry-main-container' id='edit-entry-ref'>
            <form onSubmit={handleSave} >
                <div className='editentry-main-container'>
                    <div id='entryedit-toolbar-container'>
                          <div>
                              <MenuBar editor={editor}/>
                          </div>
                          <div id='editentry-save-btn-container' >
                              <p>{content === entry.content ? 'Saved' : ''}</p>
                              <button className="modal-button entry-button" type='submit'>Save</button>
                          </div>
                      </div>
                      <div className="entry-content-container">
                        <EditorContent editor={editor}/>
                    </div>
                </div>

            </form>
        </div>
    )
}

export default EntryEditPage;
