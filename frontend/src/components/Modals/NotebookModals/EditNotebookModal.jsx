import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useModal } from "../../../context/Modal";
import "./NewNotebookModal.css";
import { thunkEditNotebook, thunkLoadNotebooks } from "../../../redux/notebook";

function EditNotebookFormModal({notebook}) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const [name, setName] = useState(notebook.name);
    const [about, setAbout] = useState(notebook.about);
    const [validationErrors, setValidationErrors] = useState({});
    const { closeModal } = useModal();

    useEffect(() => {
        const errors = {};
        if (name <= 0) errors.name = 'Notebook name is required'
        if (name.length > 100) errors.name = 'Notebook name can not be over 100 characters'
        if (about.length > 400) errors.about = 'Notebook about section can not be over 400 characters'
        setValidationErrors(errors)
    }, [name, about]);

    useEffect(() => {
        if (about === '') setAbout(' ')
      }, [about])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Object.values(validationErrors).length) return;

        const serverResponse = await dispatch(thunkEditNotebook ({
            id: notebook.id,
            userId: user.id,
            name,
            about,
            })
        );

        if (serverResponse.name) {
            setValidationErrors(serverResponse);
        } else {
            await dispatch(thunkLoadNotebooks())
            setName('')
            setAbout('')
            await closeModal();
        }
    };

    return (
        <div id='notebook-edit-modal'>
            <h1>Edit Notebook</h1>
            <form onSubmit={handleSubmit}>
                <div className="edit-notebook-info-1">
                    <label className="edit-notebook-label">Do you want to change the name of your notebook?</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    {validationErrors.name ? <p className="error-validation">{validationErrors.name}</p> : <p>{`${name.length}/100`}</p>}
                </div>

                <div className="edit-notebook-info-2">
                    <div className="edit-notebook-label">Write a little about what you will use this notebook for!</div>
                    <div>This is not required but it is a helpful way to keep your writing organized.</div>
                    <textarea
                        value={about}
                        rows={12}
                        cols={60}
                        onChange={(e) => setAbout(e.target.value)}
                        required
                    />
                    <p className={validationErrors.about ? "notebook-errors" : 'notebook-about-edit'}>{validationErrors.about ? `${validationErrors.about}` : `${about.length}/400` }</p>
                </div>

                <div className="edit-notebook-button-container">
                  <button type="submit" className="modal-button edit-notebook-button">Submit Changes</button>
                </div>
            </form>
        </div>
    );
}

export default EditNotebookFormModal;
