import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useModal } from "../../../context/Modal";
import "./EntryModals.css";
import { thunkLoadNotebooks } from "../../../redux/notebook";
import { thunkEditEntry } from "../../../redux/entry";

function SaveEntryModal({entry, content}) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  // const [name, setName] = useState(entry.name);
  const [validationErrors, setValidationErrors] = useState({});
  const { closeModal } = useModal();
  console.log('content', content)

  const saveChanges = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(thunkEditEntry ({
      id: entry.id,
      userId: user.id,
      notebookId: entry.notebook_id,
      name: entry.name,
      content: content,
      isPublic: entry.is_public
    })
  );

  if (serverResponse.name) {
    setErrors(serverResponse);
  } else {
    await dispatch(thunkLoadNotebooks())
    closeModal();
  }
    closeModal();
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
