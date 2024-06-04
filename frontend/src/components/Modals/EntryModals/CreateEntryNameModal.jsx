import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { thunkCreateEntry, thunkLoadEntries } from "../../../redux/entry";
import { useModal } from "../../../context/Modal";
import "./EntryModals.css";



function CreateEntryNameFormModal() {
    const {notebookId} = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const [name, setName] = useState('');
    const [validationErrors, setValidationErrors] = useState({});
    const { closeModal } = useModal();

    useEffect(() => {
        const errors = {};
        if (name <= 0) errors.name = 'Please provide a name for your entry'
        if (name.length > 100) errors.name = 'Name must be 100 characters or less'
        setValidationErrors(errors)
    }, [name])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validationErrors.name) return;

        const serverResponse = await dispatch(thunkCreateEntry ({
            userId: user.id,
            notebookId: notebookId,
            name,
            content: '',
            isPublic: false
        }));

        if (serverResponse.name) {
            setValidationErrors(serverResponse);
        } else {
            await dispatch(thunkLoadEntries())
            setName('')
            navigate(`/notebook/${notebookId}/entries/${serverResponse.entry.id}`)
            closeModal();
        }
    };

  return (
    <div id='notebook-create-modal'>
        <h1>Create an Entry</h1>
        <form onSubmit={handleSubmit}>

            <div className="edit-notebook-info-1">
                <label className="edit-notebook-label">What is a good name for this entry?</label>
                <input
                    className="name-input"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <p className={validationErrors.name ? "entry-validation-errors" : 'no-errors'}>{`${name.length}/100`}</p>
            </div>
            <div className="edit-notebook-button-container">
                <button type="submit" className="modal-button edit-notebook-button">Submit Changes</button>
            </div>

        </form>
    </div>
  );
}

export default CreateEntryNameFormModal;
