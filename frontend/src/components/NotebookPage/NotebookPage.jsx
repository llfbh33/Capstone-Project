import { useParams } from 'react-router-dom'
import LeftNavigation from "../LeftNavigation/LeftNavigation";
import { useSelector } from "react-redux";
import './NotebookPage.css'


// adjust this page for entries instead of notebooks

function NotebookPage () {
    const {notebookId} = useParams()
    const user = useSelector(state => state.session.user)
    const notebooks = useSelector(state => state.notebooks)
    const currNotebook = useSelector(state => state.notebooks[notebookId])

    const handleDeleteNotebook = () => {
        alert(`This button will delete the current notebook, notebook ${notebookId}. Then navigate the user back to the home page`)
    }

    const handleClickEntry = (id) => {
        alert(`feature will send user to entry ${id} page`)
        // navigate(`/notebook/${id}`)
    }

    const handleNewEntry = () => {
        alert(`create new entry here`)
    }

    return (
        <div className='main-insite-container' >
            <div className='left-hand-nav-container'>
                <LeftNavigation />
            </div>
            <div className='main-insite-content-container'>
                <div className='top-statement-bar'>
                    <p className='mini-page-title' >Create an entry in your notebook or keep working on one you have already made.</p>
                    <button className='button delete-notebook-btn' onClick={handleDeleteNotebook}>{`Delete ${currNotebook.name}?`}</button>
                </div>
                <h1 id='homepage-user-title'>{`Notebook: ${currNotebook?.name}`}</h1>
                <div id='notebookpage-about-section-container' >
                    <div className='notebookpage-about-section'>
                        {currNotebook.about}
                    </div>
                </div>
                <h1 id='homepage-underline'></h1>
                <p className="page-title-blocks">Your Entries</p>
                <div id='homepage-notebook-card-container'>
                    {notebooks
                        ? Object.values(notebooks).map(notebook => (
                            <div className="homepage-notebook-card" key={notebook.id} onClick={() => handleClickEntry(notebook.id)}>
                                <div>{notebook.name}</div>
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
        </div>
    )
}

export default NotebookPage
