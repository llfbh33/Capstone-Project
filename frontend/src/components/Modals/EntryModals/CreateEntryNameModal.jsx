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
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    useEffect(() => {
        const validationErrors = {};
        if (name <= 0) validationErrors.name = 'Please provide a name for your entry'
        if (name.length > 100) validationErrors.name = 'Name must be 100 characters or less'
        setErrors(validationErrors)
    }, [name])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (errors.name) return;

        const serverResponse = await dispatch(thunkCreateEntry ({
            userId: user.id,
            notebookId: notebookId,
            name,
            content: '',
            isPublic: false
        }));

        if (serverResponse.name) {
            setErrors(serverResponse);
        } else {
            await dispatch(thunkLoadEntries())
            setName('')
            navigate(`/notebook/${notebookId}/entries/${serverResponse.entry.id}`)
            closeModal();
        }
    };

  return (
    <div className='entry-modal-main-container'>
        <h1 className="entry-modal-titles">Create an Entry</h1>
        <form onSubmit={handleSubmit}>

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
  );
}

export default CreateEntryNameFormModal;
