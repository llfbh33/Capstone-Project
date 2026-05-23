import { useState } from "react";
import { useDispatch } from "react-redux";
import { thunkFeaturedNotebook } from "../../../redux/notebook";
import EditNotebookFormModal from "../../Modals/NotebookModals/EditNotebookModal";
import DeleteNotebookFormModal from "../../Modals/NotebookModals/DeleteNotebookModal";
import OpenModalMenuItem from "../../Modals/OpenModalButton/OpenModalMenuItem";

import { FaEllipsisV } from "react-icons/fa";


const NotebookActions = ({ notebook }) => {
    const dispatch = useDispatch();
    const [actionItem, setActionItem] = useState(null);

    const handleSetFeatured = async (id) => {
        await dispatch(thunkFeaturedNotebook(id))
    };


    return (
        <div className="action-wrapper">
            <div className="notebook-edit" onClick={() => setActionItem(prev => prev === notebook.id ? null : notebook.id)}>
                <FaEllipsisV />
            </div>
            {actionItem === notebook.id && (
                <div className="action-container" onMouseLeave={() => setActionItem(null)}>
                    <div className="notebook-edit" onClick={() => handleClickNotebook(notebook.id)}>
                        View
                    </div>
                    <div className="notebook-edit" style={{ minWidth: "24px" }} onClick={() => handleSetFeatured(notebook.id)}>
                        Set Featured
                    </div>
                    <div className="notebook-edit" style={{ minWidth: "24px" }} onClick={() => handleEditNotebook(notebook.id)}>
                        <OpenModalMenuItem
                            itemText={`Edit`}
                            modalComponent={<EditNotebookFormModal notebook={notebook} />}
                        />
                    </div>
                    <div className="notebook-edit" style={{ minWidth: "24px" }} onClick={() => handleDeleteNotebook(notebook.id)}>
                        <OpenModalMenuItem
                            itemText={`Delete`}
                            modalComponent={<DeleteNotebookFormModal notebook={notebook} />}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default NotebookActions;