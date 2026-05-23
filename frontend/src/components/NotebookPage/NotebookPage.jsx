import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from "react-redux";
import { useEffect, useState, useMemo } from 'react';
import { BsTrash3Fill } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";

import CreateEntryNameFormModal from '../Modals/EntryModals/CreateEntryNameModal';
import DeleteEntryFormModal from '../Modals/EntryModals/DeleteEntryModal';
import OpenModalMenuItem from '../Modals/OpenModalButton/OpenModalMenuItem';
import { useModal } from '../../context/Modal/Modal';
import './NotebookPage.css'


function NotebookPage() {
    const { notebookId } = useParams();
    const navigate = useNavigate();
    const entriesObj = useSelector(state => state.entries);
    const entries = useMemo(() => {
        return Object.values(entriesObj)
            .filter(entry => entry.notebook_id === parseInt(notebookId))
            .sort(
                (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
            );
    }, [entriesObj]);
    const currNotebook = useSelector(state => state.notebooks[notebookId]);
    const [noteEntries, setNoteEntries] = useState('')
    const { setModalContent } = useModal();

    // useEffect(() => {
    //     let notebookEntries = Object.values(entries).filter(entry => entry.notebook_id === parseInt(notebookId))
    //     setNoteEntries(notebookEntries)
    // }, [notebookId, entries])

    const handleClickEntry = (entry) => {
        navigate(`/notebook/${notebookId}/entries/${entry.id}`)
    }

    const handleNewEntry = () => {
        let modalComponent = <CreateEntryNameFormModal />
        setModalContent(modalComponent);
    }

    return (
        <div className="main-container">
            <div className="child-container">
                <div className="child-container-two">
                    <div className="navigation-tabs-container" >
                        <div className="navigation-tabs" onClick={() => navigate('/notebooks')}>Notebooks</div>
                        <div className="navigation-intermediary">{`>`}</div>
                        <div className="navigation-tabs" onClick={() => navigate(`/notebook/${currNotebook.id}`)}>{currNotebook.name}</div>
                    </div>
                    <div className="padding-container-header-notebooks">
                        <h1 className="page-title">{currNotebook.name}</h1>
                        <div className="new-search-notebooks-container">
                            <button
                                className="new-notebook-button"
                            // onClick={handleNewNotebook}
                            >
                                <div className="new-notebook-text">
                                    <FaPlus />
                                    <p>New Entry</p>
                                </div>
                            </button>
                        </div>
                    </div>
                    <div className="featured-notebook-container">
                        <div className="featured-label-container">
                            <span>Description</span>
                        </div>
                        <div className="featured-notebook-data">
                            <div className="padding-container-header-notebooks">
                                <div className="notebook-description-container">
                                    <div className="page-title">{currNotebook.about}</div>
                                    {/* <div className="new-search-notebooks-container">
                                <button
                                    className="new-notebook-button"
                                    // onClick={handleNewNotebook}
                                >
                                    <div className="new-notebook-text">
                                        <FaPlus />
                                        <p>New Entry</p>
                                    </div>
                                </button>
                            </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="all-notebooks-container">
                        <div className="all-notebooks-action">
                            <p>Entries</p>
                            <p>Sorted by: Last Updated</p>
                        </div>
                    </div>
                    <div className="notebooks-block-container"></div>
                    {/* <div className="items-container">
                        <div className="horizontal-container">
                            <FeaturedNotebook notebook={featuredNotebook} handleClickNotebook={handleClickNotebook} />
                            <div className="all-notebooks-container">
                                <div className="all-notebooks-action">
                                    <p>All Notebooks</p>
                                    <p>Sorted by: Last Created</p>
                                </div>
                                <div className="notebooks-block-container">
                                    {notebooks.map((notebook, index) => {
                                        if (notebook.id === featuredNotebook.id) return <></>
                                        else return (
                                            <div className='dash-comp-container individual-notebooks' key={notebook.id} onClick={() => handleClickNotebook(notebook.id)}>
                                                <div className='pannel-formatting'>
                                                    <div className='notebook-pannel-heading'>
                                                        <img className="book-image-all" src={notebookImages[index % 6]}></img>
                                                        <div style={{ display: "flex", alignItems: "center", minHeight: "50px" }}>
                                                            <NotebookActions notebook={notebook} handleClickNotebook={handleClickNotebook} />
                                                        </div>
                                                    </div>
                                                    <div className="notebook-panel-container">
                                                        <h3>{notebook.name}</h3>
                                                        <p>
                                                            {notebook.about.length > 160 ? `${notebook.about.slice(0, 160)}...` : notebook.about}
                                                        </p>

                                                        <div className="notebook-last-edited">
                                                            <span>Last edited - </span>
                                                            <span>{friendlyDate(notebook.updated_at)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
        // <div className='homepage-main-container'>
        //     <h1 className='title page-title'>{`${currNotebook?.name}`}</h1>
        //     <p className="title page-subtitle">Description</p>
        //     <div id='notebookpage-about-section-container' >
        //         <div className='notebookpage-about-section'>
        //             {currNotebook?.about}
        //         </div>
        //     </div>
        //     <p className="title page-subtitle">Entries</p>
        //     <div id='homepage-notebook-card-container'>
        //         {entries
        //             ? entries.map(entry => (
        //                 <div key={entry.id}>
        //                     <div className="homepage-notebook-card"  >
        //                         <div className="homepage-notebook-card-details" onClick={() => handleClickEntry(entry)}>
        //                             <div>{entry?.name}</div>
        //                         </div>
        //                         <div className="notebook-edit-delete-container">
        //                             <div className='homepage-edit-notebook'>
        //                                 <OpenModalMenuItem
        //                                     itemText={<BsTrash3Fill />}
        //                                     modalComponent={<DeleteEntryFormModal entry={entry} />}
        //                                 />
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //             ))
        //             : ''}
        //         <div id='homepage-new-notebook-card' onClick={handleNewEntry} >
        //             <div id='create-notebook-title' >
        //                 Click here to create a new Entry
        //             </div>
        //         </div>
        //     </div>
        // </div>

    )
}

export default NotebookPage
