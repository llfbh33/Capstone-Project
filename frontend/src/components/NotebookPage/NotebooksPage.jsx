import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { BsTrash3Fill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";


import NewNotebookFormModal from "../Modals/NotebookModals/NewNotebookModal";
import EditNotebookFormModal from "../Modals/NotebookModals/EditNotebookModal"
import OpenModalMenuItem from "../Modals/OpenModalButton/OpenModalMenuItem"
import DeleteNotebookFormModal from "../Modals/NotebookModals/DeleteNotebookModal";
// import { useNav } from "../../context/Navigation/NavigationContext";
import { useModal } from '../../context/Modal/Modal';
// import './NotebooksPage.css'
import { useEffect, useState } from "react";
import LoadingPage from "../LoadingPage/LoadingPage";
import FeaturedNotebook from "./NotebookComponents/FeaturedNotebook";



const notebookImages = [
    './greenNotebook.png',
    './brownNotebook.png',
    './darkBlueNotebook.png',
    './magentaNotebook.png',
    './orangeNotebook.png',
    './blueNotebook.png',
]


function NotebooksPage() {
    const user = useSelector(state => state.session.user);
    // const { setActiveNav } = useNav();
    const notebookObj = useSelector(state => state.notebooks);
    const notebooks = useMemo(() => {
        return Object.values(notebookObj).sort(
            (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
        );
    }, [notebookObj]);
    // const [theseNotebooks, setTheseNotebooks] = useState('');
    const [loading, setLoading] = useState(true);
    const { setModalContent } = useModal();
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (notebooks) setTheseNotebooks(notebooks)
    // }, [notebooks])

    // useEffect(() => {
    //     if (theseNotebooks) setLoading(false)
    // }, [theseNotebooks])

    const handleClickNotebook = (id) => {
        navigate(`/notebook/${id}`)
    }

    const handleNewNotebook = () => {
        let modalComponent = <NewNotebookFormModal />
        setModalContent(modalComponent);
    }

    if (!notebooks) {
        return (
            <div className='dash-comp-container'>
                <div className='pannel-formatting'>
                    Loading...
                </div>
            </div>
        )
    }


    return (
        <div className="main-container">
            <div className="child-container">
                <div className="child-container-two">
                    <div className="padding-container-header-notebooks">
                        <h1 className="page-title">{`${user?.name}'s Notebook's`}</h1>
                        <div className="new-search-notebooks-container">
                            <button
                                className="new-notebook-button"
                                onClick={handleNewNotebook}
                            >
                                <div className="new-notebook-text">
                                    <FaPlus />
                                    <p>New Notebook</p>
                                </div>
                            </button>
                        </div>
                    </div>
                    <div className="items-container">
                        <div className="horizontal-container">
                            <FeaturedNotebook notebook={{id: 1}} handleClickNotebook={handleClickNotebook}/>
                            <div className="all-notebooks-container">
                                <div className="all-notebooks-action">
                                    <p>All Notebooks</p>
                                    <p>Sorted by: Last Edited</p>
                                </div>
                                <div className="notebooks-block-container">
                                    {notebooks.map((notebook, index) => (
                                        <div className='dash-comp-container individual-notebooks' key={notebook.id}>
                                            <div className='pannel-formatting'>
                                                <div className='notebook-pannel-heading'>
                                                    <img className="book-image-all" src={notebookImages[index % 6]}></img>
                                                    <div className="notebook-edit" onClick={() => handleClickNotebook(notebook.id)}>
                                                        <div>View</div>
                                                    </div>
                                                </div>
                                                <div className="notebook-panel-container">
                                                    <h3>{notebook.name}</h3>
                                                    <p>
                                                        {notebook.about.length > 160 ? `${notebook.about.slice(0, 160)}...` : notebook.about}
                                                    </p>

                                                    <div className="notebook-last-edited">
                                                        <span>Last edited - </span>
                                                        <span>{notebook.updated_at}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div id='homepage-notebook-card-container'>

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
                                Ready to write? Create a notebook to get started!
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}


export default NotebooksPage;
