import { useSelector, useDispatch } from "react-redux";
import './HomePage.css'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { thunkDeleteNotebook} from '../../redux/notebook';

import NewNotebookFormModal from "../Modals/NotebookModals/NewNotebookModal";
// import EditNotebookFormModal from "../Modals/NotebookModals/EditNotebookModal"
import EditNotebookFormModal from "../Modals/NotebookModals/EditNotenookModal"
import OpenModalMenuItem from "../Modals/OpenModalButton/OpenModalMenuItem"

function HomePage () {
    const user = useSelector(state => state.session.user)
    const notebooks = useSelector(state => state.notebooks)
    const [loaded, setLoaded] = useState(false)
    const [gotNotebooks, setGotNotebooks] = useState('')
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user) navigate('/')
    }, [user, navigate])

    useEffect(() => {
        if (notebooks) {
            setGotNotebooks(notebooks)
        }
    }, [notebooks])

    useEffect(() => {
        if (gotNotebooks) {
            setLoaded(true)
        } else {
            setLoaded(false)
        }
    }, [gotNotebooks])

    const handleClickNotebook = (id) => {
        // alert(`feature will send user to notebook ${id} page`)
        setLoaded(false)
        navigate(`/notebook/${id}`)
    }

    const handleDeleteNotebook = async (id) => {
        dispatch(thunkDeleteNotebook(id))
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
                                            <div>{notebook?.name}</div>
                                        </div>
                                        <div>
                                        <div className="button homepage-edit-notebook">
                                            <OpenModalMenuItem
                                            itemText={`Edit ${notebook?.name}`}
                                            modalComponent={<EditNotebookFormModal notebook={notebook} />}
                                            />
                                        </div>
                                        <button className="button homepage-delete-notebook" onClick={() => handleDeleteNotebook(notebook?.id)}>{`Delete ${notebook?.name}?`}</button>
                                        </div>
                                    </div>
                                </div>
                                ))
                            }
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
                    <div>
                        <div>
                            This is where we will map all of our public entries
                        </div>
                    </div>
                </div>

    )
}


export default HomePage;
