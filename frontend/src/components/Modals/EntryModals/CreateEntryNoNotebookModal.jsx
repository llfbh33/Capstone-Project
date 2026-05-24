import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNav } from "../../../context/Navigation/NavigationContext";
import { thunkCreateEntry, thunkLoadEntries } from "../../../redux/entry";
import { useModal } from "../../../context/Modal/Modal";
import "./EntryModals.css";



function CreateEntryNoNotebookModal({ notebook }) {
    const { notebookId } = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const notebooks = useSelector(state => Object.values(state.notebooks))
    const [name, setName] = useState('');
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();
    const { setActiveNav } = useNav();

    const [selectedNotebook, setSelectedNotebook] = useState(notebook ? notebook : notebooks[0]);
    const [showNotebookDropdown, setShowNotebookDropdown] = useState(false);

    useEffect(() => {
        const validationErrors = {};
        if (name <= 0) validationErrors.name = 'Please provide a name for your entry'
        if (name.length > 100) validationErrors.name = 'Name must be 100 characters or less'
        if (!selectedNotebook) validationErrors.notebook = 'Choose a notebook to create an entry'
        setErrors(validationErrors)
    }, [name])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (errors.name) return;

        const serverResponse = await dispatch(thunkCreateEntry({
            userId: user.id,
            notebookId: selectedNotebook.id,
            name,
            content: '',
            isPublic: false
        }));

        if (serverResponse.errors) {
            setErrors(serverResponse.errors);
        } else {
            await dispatch(thunkLoadEntries())
            setName('')
            setSelectedNotebook(notebooks[0])
            navigate(`/notebook/${selectedNotebook.id}/entries/${serverResponse.id}`)
            closeModal();
        }
    };

    const handleNotebooks = () => {
        navigate('/notebooks');
        setActiveNav('notebooks');
        closeModal();
    }

    return (
        <>
            {notebooks.length > 0 ? (
                <div className='entry-modal-main-container'>
                    <h1 className="entry-modal-titles">Create an Entry</h1>
                    <form onSubmit={handleSubmit}>

                        <div className="entry-modal-form-container">
                            <label className="entry-modal-label">Which Notebook should this entry be added to?</label>
                            <div class="create-entry-search-input">
                                <div
                                    className="all-entries-filter-component notebook-dropdown-trigger"
                                    onClick={() => setShowNotebookDropdown(prev => !prev)}
                                    onBlur={() => {
                                        setTimeout(() => {
                                            setShowNotebookDropdown(false);
                                        }, 100);
                                    }}
                                    tabIndex={0}
                                >
                                    {selectedNotebook.name}
                                </div>

                                {showNotebookDropdown && (
                                    <div className="search-dropdown">
                                        {notebooks.map(notebook => (
                                            <div
                                                key={notebook.id}
                                                className="search-dropdown-item"
                                                onClick={() => {
                                                    setSelectedNotebook(notebook);
                                                    setShowNotebookDropdown(false);
                                                }}
                                            >
                                                {notebook.name}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="entry-modal-form-container">
                            <label className="entry-modal-label">What is a good name for this entry?</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <p className={errors.name ? 'entry-modal-errors' : 'entry-modal-no-errors'} >{`${name.length}/100`}</p>
                        </div>
                        <div className="entry-modal-conformation-btn-container">
                            <button type="submit" className="modal-button conformation-btn">Submit Changes</button>
                        </div>

                    </form>
                </div>

            ) : (
            <div className='entry-modal-main-container'>
                <h1 className="entry-modal-titles">Looks like you don't have any notebooks yet. Go to your Notebooks page to create one.</h1>
                <button className="modal-button" onClick={handleNotebooks}>Notebooks Page</button>
            </div>)
            }
        </>
    );
}

export default CreateEntryNoNotebookModal;
