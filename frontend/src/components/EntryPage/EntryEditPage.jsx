//imports for text editor
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import Underline from '@tiptap/extension-underline';
import TextStyle from '@tiptap/extension-text-style'
import StarterKit from '@tiptap/starter-kit'
import { useEditor, EditorContent } from '@tiptap/react'

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef, useCallback, useEffect } from "react";

import SaveEntryModal from '../Modals/EntryModals/SaveEntryModal'
import { thunkEditEntry, thunkLoadEntries } from "../../redux/entry";
import { useModal } from "../../context/Modal";
import MenuBar from "../TipTap/TipTap";
import './EntryPage.css'



function EntryEditPage({setIsPreview}) {
    const { entryId } = useParams();
    const entry = useSelector(state => state.entries[parseInt(entryId)]);
    const dispatch = useDispatch();
    const [content, setContent] = useState(entry.content);
    const [saved, setSaved] = useState(true);
    const { setModalContent } = useModal();

    useEffect(() => {
        if (content !== entry.content) setSaved(false);
    }, [content, entry])


// creates a reference which is added to the main div of the edit area
    const refOne = useRef(null)
// callback function which will be activated if content is changed
    const outsideClick = useCallback((e) => {
      document.removeEventListener('click', outsideClick, true)
      if (entry.content !== content) {
        if(!refOne.current.contains(e.target)) {
            const modalComponent =<SaveEntryModal  entry={entry} content={content} setIsPreview={setIsPreview}/>
            setModalContent(modalComponent);
        }
      }
      return
    }, [content, entry, setModalContent, setIsPreview] )
// adds an event listener to the page
    document.addEventListener('click', outsideClick, true)


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
        Underline,
        onUpdate: ({editor}) => {
            const html = editor.getHTML()
            setContent(html);
        }
    })


    const handleSave = async (e) => {
        if (e) e.preventDefault();

        await dispatch(thunkEditEntry ({
            id: entry.id,
            userId: entry.user_id,
            notebookId: entry.notebook_id,
            name: entry.name,
            content,
            isPublic: entry.is_public
            }));

        await dispatch(thunkLoadEntries());
        setSaved(true);
        return document.removeEventListener('click', outsideClick, true)
    };


    return (
        <div ref={refOne} className='editentry-main-container' id='edit-entry-ref'>
            <div id='editentry-save-btn-container' >
                <button className="modal-button entry-button" onClick={handleSave}>Save</button>
                <p>{saved ? 'Saved' : ''}</p>
            </div>
            <div className='editentry-container'>
                <div id='entryedit-toolbar-container'>
                        <div className='edit-entry-tool-bar'>
                            <MenuBar editor={editor}/>
                        </div>
                    </div>
                <div className="entry-content-container">
                    <EditorContent editor={editor} />
                </div>
            </div>
        </div>
    )
}

export default EntryEditPage;
