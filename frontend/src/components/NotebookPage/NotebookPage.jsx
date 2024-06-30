import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { BsTrash3Fill } from "react-icons/bs";

import CreateEntryNameFormModal from '../Modals/EntryModals/CreateEntryNameModal';
import DeleteEntryFormModal from '../Modals/EntryModals/DeleteEntryModal';
import OpenModalMenuItem from '../Modals/OpenModalButton/OpenModalMenuItem';
import { useModal } from '../../context/Modal';
import './NotebookPage.css'


function NotebookPage () {
    const {notebookId} = useParams();
    const navigate = useNavigate();
    const entries = useSelector(state => state.entries);
    const currNotebook = useSelector(state => state.notebooks[notebookId]);
    const [noteEntries, setNoteEntries] = useState('')
    const { setModalContent } = useModal();

    useEffect(() => {
        let notebookEntries = Object.values(entries).filter(entry => entry.notebook_id === parseInt(notebookId))
        setNoteEntries(notebookEntries)
    }, [notebookId, entries])

    const handleClickEntry = (entry) => {
        navigate(`/notebook/${notebookId}/entries/${entry.id}`)
    }

    const handleNewEntry = () => {
        let modalComponent =<CreateEntryNameFormModal />
        setModalContent(modalComponent);
    }

    return (
            <div className='homepage-main-container'>
                <div className='top-statement-bar'>
                    <p className='mini-page-title' >Create an entry in your notebook or keep working on one you have already made.</p>
                </div>
                <h1 id='homepage-user-title'>{`Notebook: ${currNotebook?.name}`}</h1>
                <div id='notebookpage-about-section-container' >
                    <div className='notebookpage-about-section'>
                        {currNotebook?.about}
                    </div>
                </div>
                <h1 id='homepage-underline'></h1>
                <p className="page-title-explainer">Your Entries</p>
                <div id='homepage-notebook-card-container'>
                    {entries
                        ? Object.values(noteEntries).map(entry => (
                            <div key={entry.id}>
                                <div className="homepage-notebook-card"  >
                                    <div className="homepage-notebook-card-details" onClick={() => handleClickEntry(entry)}>
                                        <div>{entry?.name}</div>
                                    </div>
                                    <div className="notebook-edit-delete-container">
                                        <div className='homepage-edit-notebook'>
                                            <OpenModalMenuItem
                                            itemText={<BsTrash3Fill />}
                                            modalComponent={<DeleteEntryFormModal entry={entry} />}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            ))
                    : ''}
                    <div id='homepage-new-notebook-card' onClick={handleNewEntry} >
                        <div id='create-notebook-title' >
                            Click here to create a new Entry
                        </div>
                    </div>
                </div>
            </div>

    )
}

export default NotebookPage
