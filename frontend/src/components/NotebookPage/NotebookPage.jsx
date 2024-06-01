import { useNavigate, useParams } from 'react-router-dom'
import LeftNavigation from "../LeftNavigation/LeftNavigation";
import { useSelector, useDispatch} from "react-redux";

import './NotebookPage.css'
import { thunkDeleteNotebook, thunkLoadNotebooks } from '../../redux/notebook';
import { useEffect, useState } from 'react';


// adjust this page for entries instead of notebooks

function NotebookPage () {
    const {notebookId} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const entries = useSelector(state => state.entries);
    const currNotebook = useSelector(state => state.notebooks[notebookId]);
    const [noteEntries, setNoteEntries] = useState('')

    useEffect(() => {
        let notebookEntries = Object.values(entries).filter(entry => entry.notebook_id === parseInt(notebookId))
        console.log(notebookEntries)
        setNoteEntries(notebookEntries)
    }, [notebookId, entries])

    const handleDeleteEntry = async () => {
        // alert(`This button will delete the selected entry, entry ${id}.`)

        dispatch(thunkDeleteNotebook (notebookId))
        dispatch(thunkLoadNotebooks())
        navigate('/home')
    }

    const handleClickEntry = (entry) => {
        navigate(`notebook/${notebookId}/entries/${entry.id}`)
    }

    const handleNewEntry = () => {
        alert(`create new entry here`)
    }

    return (
<div>
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
                <p className="page-title-blocks">Your Entries</p>
                <div id='homepage-notebook-card-container'>
                    {entries
                        ? Object.values(noteEntries).map(entry => (
                            <div key={entry.id}>
                                <div className="homepage-notebook-card"  >
                                    <div className="homepage-notebook-card-details" onClick={() => handleClickEntry(entry)}>
                                        <div>{entry?.name}</div>
                                    </div>
                                    <button className="button homepage-delete-notebook" onClick={() => handleDeleteEntry(entry.id)}>{`Delete ${entry.name}?`}</button>
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
