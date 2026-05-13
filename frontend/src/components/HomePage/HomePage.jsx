import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsTrash3Fill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";

// import NewNotebookFormModal from "../Modals/NotebookModals/NewNotebookModal";
import EditNotebookFormModal from "../Modals/NotebookModals/EditNotebookModal"
import OpenModalMenuItem from "../Modals/OpenModalButton/OpenModalMenuItem"
import DeleteNotebookFormModal from "../Modals/NotebookModals/DeleteNotebookModal";
import DeleteEntryFormModal from "../Modals/EntryModals/DeleteEntryModal";
import { useNav } from "../../context/Navigation/NavigationContext";
// import { useModal } from '../../context/Modal/Modal';
import './HomePage.css'
import { useEffect, useState } from "react";
import LoadingPage from "../LoadingPage/LoadingPage";



function HomePage () {
    const user = useSelector(state => state.session.user);
    const notebooks = useSelector(state => state.notebooks);
    const entries = useSelector(state => state.entries);
    const [theseNotebooks, setTheseNotebooks] = useState('');
    const [loading, setLoading] = useState(true);
    // const { setModalContent } = useModal();
    const navigate = useNavigate();
    const { setActiveNav } = useNav();

    useEffect(() => {
        if (notebooks) setTheseNotebooks(notebooks)
    }, [notebooks])

    useEffect(() => {
        if (theseNotebooks) setLoading(false)
    }, [theseNotebooks])

    const handleClickNotebook = (id) => {
        const newActiveState = {
            main: {title: 'notebooks', route: '/notebooks', open: true},
            mid: { title: id, route: `/notebook/${id}`, open: true},
            small: { title: null, route: null, open: false}
        };
        setActiveNav(newActiveState);
        navigate(`/notebook/${id}`);
    }

    const handleClickEntry = (entry) => {
        console.log('notebookId', entry.notebook_id)
        navigate(`/notebook/${entry.notebook_id}/entries/${entry.id}`)
    }

    // const handleNewNotebook = () => {
    //     let modalComponent =<NewNotebookFormModal />
    //     setModalContent(modalComponent);
    // }

    if (loading) {
        return <LoadingPage />
    }


    return (
        <div className="main-container">
            <h1 className='title page-title'>{`${user?.name}'s Home`}</h1>
            {/* <p className="title page-subtitle">Recently Created Notebooks</p> */}
            <div id='homepage-card-container'>

                {Object.values(notebooks).reverse().slice(0,3).map(notebook => (
                    <div key={notebook?.id} className="notebook-card-container-media-query">
                        <div className="homepage-notebook-card"  >
                            <div className="homepage-notebook-card-details" onClick={() => handleClickNotebook(notebook.id)}>
                                <div>
                                    <div>{notebook?.name}</div>
                                </div>
                                <div className='notebook-about-section-container'>
                                    <div>{`${notebook?.about.slice(0, 70)}...`}</div>
                                </div>
                             </div>
                            <div className="notebook-edit-delete-container">
                                <div className="homepage-edit-notebook">
                                    <OpenModalMenuItem
                                    itemText={<FaEdit />}
                                    modalComponent={<EditNotebookFormModal notebook={notebook} />}
                                    />
                                </div>
                                <div className="homepage-edit-notebook">
                                    <OpenModalMenuItem
                                    itemText={<BsTrash3Fill />}
                                    modalComponent={<DeleteNotebookFormModal notebook={notebook} />}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {/* <div id='homepage-new-notebook-card' onClick={handleNewNotebook}>
                    <div id='create-notebook-title'>
                        Ready to write? Create a notebook to get started!
                    </div>
                </div> */}

            </div>
            <p className="title page-subtitle">Recently Created Entries</p>
                <div id='homepage-card-container'>
                    {entries
                        ? Object.values(entries).reverse().slice(0,3).map(entry => (
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
                    {/* <div id='homepage-new-notebook-card' onClick={handleNewEntry} >
                        <div id='create-notebook-title' >
                            Click here to create a new Entry
                        </div>
                    </div> */}
                </div>
        </div>
    )
}


export default HomePage;
