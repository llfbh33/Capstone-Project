import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsTrash3Fill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";

import NewNotebookFormModal from "../Modals/NotebookModals/NewNotebookModal";
import EditNotebookFormModal from "../Modals/NotebookModals/EditNotebookModal"
import OpenModalMenuItem from "../Modals/OpenModalButton/OpenModalMenuItem"
import DeleteNotebookFormModal from "../Modals/NotebookModals/DeleteNotebookModal";
import './HomePage.css'



function HomePage () {
    const user = useSelector(state => state.session.user);
    const notebooks = useSelector(state => state.notebooks);
    const navigate = useNavigate();


    const handleClickNotebook = (id) => {
        navigate(`/notebook/${id}`)
    }


    return (
        <div>
            <p className='mini-page-title' >Ready to write? Create a notebook to get started!</p>
            <h1 id='homepage-user-title'>{`${user?.name}'s Home`}</h1>
            <p className="page-title-blocks">Your Notebooks</p>
            <div id='homepage-notebook-card-container'>

                {Object.values(notebooks).map(notebook => (
                    <div key={notebook?.id}>
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

                <div id='homepage-new-notebook-card'>
                    <div id='create-notebook-title'>
                        <OpenModalMenuItem
                        itemText="Click here to create a new Notebook"
                        modalComponent={<NewNotebookFormModal />}
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}


export default HomePage;
