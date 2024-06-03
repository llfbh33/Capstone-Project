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
}

export default EntryPage;
