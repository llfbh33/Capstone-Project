import { useSelector, useDispatch } from "react-redux";
import './HomePage.css'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { thunkDeleteNotebook} from '../../redux/notebook';
import { BsTrash3Fill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";

import NewNotebookFormModal from "../Modals/NotebookModals/NewNotebookModal";
// import EditNotebookFormModal from "../Modals/NotebookModals/EditNotebookModal"
import EditNotebookFormModal from "../Modals/NotebookModals/EditNotebookModal"
import OpenModalMenuItem from "../Modals/OpenModalButton/OpenModalMenuItem"
import DeleteNotebookFormModal from "../Modals/NotebookModals/DeleteNotebookModal";
import EditPostFormModal from "../Modals/PostModals/EditPostModal";
import DeleteEntryFormModal from "../Modals/EntryModals/DeleteEntryModal";
import RemovePostModal from "../Modals/PostModals/RemovePostModal";

function HomePage () {
    const user = useSelector(state => state.session.user)
    const notebooks = useSelector(state => state.notebooks)
    const allEntries = useSelector(state => state.entries)
    const [entries, setEntries] = useState(Object.values(allEntries).filter(entry => entry.user_id === user.id && entry.is_public === true))
    const [loaded, setLoaded] = useState(false)
    const [gotNotebooks, setGotNotebooks] = useState('')
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        setEntries(Object.values(allEntries).filter(entry => entry.user_id === user.id && entry.is_public === true))
    }, [allEntries])

    useEffect(() => {
        if (!user) navigate('/')
    }, [user, navigate])

    // useEffect(() => {
    //     if (notebooks) {
    //         setGotNotebooks(notebooks)
    //     }
    // }, [notebooks])

    // useEffect(() => {
    //     if (gotNotebooks) {
    //         setLoaded(true)
    //     } else {
    //         setLoaded(false)
    //     }
    // }, [gotNotebooks])

    const handleClickNotebook = (id) => {
        setLoaded(false)
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
                                                <div>{`${notebook?.about.slice(0, 120)}...`}</div>
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
                                            {/* <button className="homepage-delete-notebook" onClick={() => handleDeleteNotebook(notebook?.id)}><BsTrash3Fill /></button> */}
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
                    <h1 id='homepage-underline'></h1>
                    <p className="page-title-blocks">Your Public Entries</p>
                    <div id='homepage-notebook-card-container'>
                        {entries.map(entry => (
                                <div key={entry?.id}>
                                    <div className="homepage-notebook-card"  >
                                        <div className="homepage-notebook-card-details" onClick={() => navigate(`/public/${entry?.id}`)}>
                                            <div>
                                                <div>{entry?.name}</div>
                                            </div>
                                            <div className='notebook-about-section-container'>
                                                <div>{`${entry?.post.message}`}</div>
                                            </div>

                                        </div>
                                    <div className="notebook-edit-delete-container">
                                        <div className="homepage-edit-notebook">
                                            <OpenModalMenuItem
                                            itemText={<FaEdit />}
                                            modalComponent={<EditPostFormModal post={entry} />}
                                            />
                                        </div>
                                        <div className="homepage-edit-notebook">
                                            <OpenModalMenuItem
                                            itemText={<BsTrash3Fill />}
                                            modalComponent={<RemovePostModal post={entry} />}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
    )
}


export default HomePage;
