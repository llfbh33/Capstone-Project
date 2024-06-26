import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsTrash3Fill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";

import NewNotebookFormModal from "../Modals/NotebookModals/NewNotebookModal";
import EditNotebookFormModal from "../Modals/NotebookModals/EditNotebookModal"
import OpenModalMenuItem from "../Modals/OpenModalButton/OpenModalMenuItem"
import DeleteNotebookFormModal from "../Modals/NotebookModals/DeleteNotebookModal";
import { useModal } from '../../context/Modal';
import './HomePage.css'
import { useEffect, useState } from "react";
import LoadingPage from "../LoadingPage/LoadingPage";



function HomePage () {
    const user = useSelector(state => state.session.user);
    const notebooks = useSelector(state => state.notebooks);
    const [theseNotebooks, setTheseNotebooks] = useState('');
    const [loading, setLoading] = useState(true);
    const { setModalContent } = useModal();
    const navigate = useNavigate();

    useEffect(() => {
        if (notebooks) setTheseNotebooks(notebooks)
    }, [notebooks])

    useEffect(() => {
        if (theseNotebooks) setLoading(false)
    }, [theseNotebooks])

    const handleClickNotebook = (id) => {
        navigate(`/notebook/${id}`)
    }

    const handleNewNotebook = () => {
        let modalComponent =<NewNotebookFormModal />
        setModalContent(modalComponent);
    }

    if (loading) {
        return <LoadingPage />
    }


    return (
        <div className="homepage-main-container">
            <p className='mini-page-explination' >Ready to write? Create a notebook to get started!</p>
            <h1 id='homepage-user-title'>{`${user?.name}'s Home`}</h1>
            <p className="page-title-explainer">Your Notebooks</p>
            <div id='homepage-notebook-card-container'>

                {Object.values(notebooks).map(notebook => (
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

                <div id='homepage-new-notebook-card' onClick={handleNewNotebook}>
                    <div id='create-notebook-title'>
                        Click here to create a new Notebook
                    </div>
                </div>

            </div>
        </div>
    )
}


export default HomePage;
