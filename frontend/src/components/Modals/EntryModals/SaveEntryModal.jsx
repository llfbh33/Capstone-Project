import { useDispatch, useSelector } from "react-redux";

import { thunkEditEntry } from "../../../redux/entry";
import { useModal } from "../../../context/Modal";
import "./EntryModals.css";
// import { useEffect } from "react";



function SaveEntryModal({entry, content, setIsPreview}) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const { closeModal } = useModal();

    // useEffect(() => {
    //     if (entry.content === content) closeModal();
    // }, [])

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
        console.log('Discard changes')
        closeModal();
    }

    return (
        <div id='save-warning-modal'>
            <div id='notebook-edit-modal'>
                <h1>You have unsaved changes!</h1>
                <div className="edit-notebook-info-1">
                    <div className="edit-notebook-label">Would you like to save your changes before leaving?</div>
                    <div className="edit-notebook-label">Any unsaved changes will be lost</div>
                </div>
                <div className="edit-notebook-button-container">
                  <button className="modal-button edit-notebook-button" onClick={saveChanges}>Submit Changes</button>
                  <button className="modal-button edit-notebook-button" onClick={deleteChanges}>Leave Without Saving</button>
                </div>
            </div>
        </div>
    );
}

export default SaveEntryModal;
