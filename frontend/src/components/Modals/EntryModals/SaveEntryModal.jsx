import { useDispatch, useSelector } from "react-redux";

import { thunkEditEntry } from "../../../redux/entry";
import { useModal } from "../../../context/Modal";
import "./EntryModals.css";



function SaveEntryModal({entry, content, setIsPreview}) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const { closeModal } = useModal();

    const saveChanges = async (e) => {
        e.preventDefault();

        await dispatch(thunkEditEntry ({
            id: entry.id,
            userId: user.id,
            notebookId: entry.notebook_id,
            name: entry.name,
            content: content,
            isPublic: entry.is_public
        }));

        setIsPreview('Edit Entry')
        await closeModal();
    }

    const deleteChanges = () => {
        setIsPreview('Edit Entry')
        closeModal();
    }

    return (
        <div className='entry-modal-main-container'>
            <div className='entry-modal-form-container'>
                <h1 className="entry-modal-titles">You have unsaved changes!</h1>
                <div className="modal">
                    <div className="entry-modal-label">Would you like to save your changes before leaving?</div>
                    <div className="entry-modal-label">Any unsaved changes will be lost</div>
                </div>
                <div className="entry-modal-conformation-btn-container">
                  <button className="modal-button conformation-btn" onClick={saveChanges}>Submit Changes</button>
                  <button className="modal-button conformation-btn" onClick={deleteChanges}>Leave Without Saving</button>
                </div>
            </div>
        </div>
    );
}

export default SaveEntryModal;
