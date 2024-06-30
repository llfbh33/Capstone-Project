import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { thunkEditEntry } from "../../../redux/entry";
import { useModal } from "../../../context/Modal";
import "./EntryModals.css";

function EditEntryNameFormModal({entry}) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const [name, setName] = useState(entry.name);
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

        const serverResponse = await dispatch(thunkEditEntry ({
            id: entry.id,
            userId: user.id,
            notebookId: entry.notebook_id,
            name,
            content: entry.content,
            isPublic: entry.is_public
            })
        );

        if (serverResponse.name) {
            setValidationErrors(serverResponse);
        } else {
            setName('')
            closeModal();
        }
    };

    return (
        <div className='entry-modal-main-container'>
            <h1 className="entry-modal-titles" >Edit Entries Name</h1>
            <form onSubmit={handleSubmit}>

                <div className="entry-modal-form-container">
                    <label className="entry-modal-label">Do you want to change the name of your Entry?</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <p className={validationErrors.name ? "entry-modal-errors" : 'entry-modal-no-errors'}>{`${name.length}/100`}</p>
                </div>
                <div className="entry-modal-conformation-btn-container">
                    <button type="submit" className="modal-button conformation-btn">Submit Changes</button>
                </div>

            </form>
        </div>
    );
}

export default EditEntryNameFormModal;
