import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import DeleteEntryFormModal from "../Modals/EntryModals/DeleteEntryModal";
import OpenModalMenuItem from "../Modals/OpenModalButton/OpenModalButton"
import EditEntryNameFormModal from "../Modals/EntryModals/EditEntryNameModal";
import EntryPreviewPage from "./EntryPreviewPage";
import EntryEditPage from "./EntryEditPage";
import PostPostModal from "../Modals/PostModals/PostEntryModal";
import RemovePostModal from "../Modals/PostModals/RemovePostModal";
import './EntryPage.css'
import LoadingPage from "../LoadingPage";
import LandingPage from "../LandingPage/LandingPage";


function EntryPage() {
    const {notebookId, entryId} = useParams();
    const entry = useSelector(state => state.entries[entryId]);
    const [content, setContent] = useState('');
    const [name, setName] = useState("");
    const [isPreview, setIsPreview] = useState('Edit Entry')
    const [loaded, setLoaded] = useState(false);
    const notebook = useSelector(state => state.notebooks[notebookId])

    useEffect(() => {
        if (entry) setLoaded(true);
        // else setLoaded(false);
    }, [entry])

    useEffect(() =>{
        if(entry?.name) {
          setName(entry.name)
        }
        if (entry?.content) {
          setContent(entry.content)
        }
    }, [entry])

    const previewSwitch = () => {
        if (isPreview === 'Preview') {
          setIsPreview('Edit Entry')
        } else {
          setIsPreview('Preview')
        }
    }

    return (
        <div>
            {loaded ?
            <div>

                <div id='entrypage-entry-notebook-title'>
                    <h2>{`Notebook: ${notebook?.name}`}</h2>
                    <div id='entrypage-entrytitle-buttons'>
                        <h1>{`Entry: ${name}`}</h1>

                        <div className="entrypage-button-container">
                            <div className="editentry-name-button" hidden={isPreview === 'Preview'}>
                                  <OpenModalMenuItem
                                  buttonText='Edit Name'
                                  modalComponent={<EditEntryNameFormModal entry={entry}/>}
                                  />
                            </div>
                            <button
                                className="modal-button entry-button"
                                onClick={previewSwitch}
                                >{isPreview}
                            </button>
                            {entry?.is_public

                            ? <div className="editentry-name-button" hidden={isPreview === 'Preview'}>
                                <OpenModalMenuItem
                                buttonText='Set Private'
                                hidden={isPreview === 'Preview'}
                                modalComponent={<RemovePostModal post={entry} />}
                                />
                            </div>

                            : <div className="editentry-name-button" hidden={isPreview === 'Preview'}>
                                <OpenModalMenuItem
                                buttonText='Set Public'
                                hidden={isPreview === 'Preview'}
                                modalComponent={<PostPostModal entry={entry} />}
                                />
                            </div>
                            }
                            <div className="editentry-name-button" hidden={isPreview === 'Preview'}>
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
                    {isPreview === 'Preview' ? <EntryEditPage entry={entry} setIsPreview={setIsPreview}/> : <EntryPreviewPage entry={entry} /> }
                </div>
            </div>
            : <LandingPage /> }
        </div>
    )
}

export default EntryPage;
