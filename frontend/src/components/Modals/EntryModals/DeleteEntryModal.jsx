import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"

import { thunkDeleteEntry } from "../../../redux/entry"
import { useModal } from "../../../context/Modal"
import './EntryModals.css'

function DeleteEntryFormModal({entry}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { closeModal } = useModal();

    const deleteEntry = async () => {
        await dispatch(thunkDeleteEntry(entry.id))
        await closeModal();
        navigate(`notebook/${entry.notebook_id}`);
    }

    const doNotDelete = () => {
        closeModal()
        return
    }

    return (
        <div>
            <h1>{`Are you sure you want to delete "${entry.name}"`}</h1>
            <div id='remove-post-button-container'>
                <button className="modal-button delete-comment-button" onClick={deleteEntry}>Yes, Delete</button>
                <button className="modal-button delete-comment-button" onClick={doNotDelete}>No, Keep</button>
            </div>
        </div>
    )
}


export default DeleteEntryFormModal
