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
        <div className="entry-modal-main-container">
            <h1 className="entry-modal-titles">{`Are you sure you want to delete:`}</h1>
            <h1 className="entry-modal-titles">{`"${entry.name}" ?`}</h1>
            <div className="entry-modal-errors"></div>
            <div className='entry-modal-conformation-btn-container'>
                <button className="modal-button conformation-btn" onClick={deleteEntry}>Yes, Delete</button>
                <button className="modal-button conformation-btn" onClick={doNotDelete}>No, Keep</button>
            </div>
        </div>
    )
}


export default DeleteEntryFormModal
