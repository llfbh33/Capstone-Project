import { useDispatch } from "react-redux"
import { thunkDeleteNotebook } from "../../../redux/notebook"
import { useModal } from "../../../context/Modal/Modal";
import './NotebookModal.css'

function DeleteNotebookFormModal({notebook}) {
    const dispatch = useDispatch()
    const { closeModal } = useModal();

    const deleteNotebook = async () => {
        await dispatch(thunkDeleteNotebook(notebook.id))
        await closeModal()
        return
    }

    const doNotDelete = () => {
        closeModal()
        return
    }

    return (
        <div id='post-remove-modal-container'>
            <h2 className="wrap-name">{`Are you sure you want to delete "${notebook.name}" ?`}</h2>
            <h4 className="post-remove-disclaimer">{`Deleting your notebook will also delete all of the entries within. Are you sure?.`}</h4>
            <div id='remove-post-button-container'>
                <button className="modal-button delete-notebook-button-modal" onClick={deleteNotebook}>Yes, Delete Notebook</button>
                <button className="modal-button delete-notebook-button-modal" onClick={doNotDelete}>No, Keep My Notebook</button>
            </div>
        </div>
    )
}

export default DeleteNotebookFormModal
