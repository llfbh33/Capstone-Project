import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { useModal } from "../../../context/Modal";

import './PostModals.css'
import { thunkEditPost } from "../../../redux/entry";

function EditPostFormModal({post}) {
    const dispatch = useDispatch();
    const [message, setMessage] = useState(post.post.message);
    const [validationErrors, setValidationErrors] = useState({});
    const { closeModal } = useModal();

    useEffect(() => {
      const errors = {};
      if (message.length > 100) errors.message = 'Message section must be 100 characters or less'
      setValidationErrors(errors)
    }, [message])

    const handleSubmit = async (e) => {
      e.preventDefault();

      const editPost = {
        entryId: post.post.id,
        message
      }

      const serverResponse = await dispatch(thunkEditPost(editPost));

      if (serverResponse.message) {
        setValidationErrors(serverResponse);
      } else {
        setMessage('')
        await closeModal();
      }
    };

    return (

      <div id='notebook-edit-modal'>
        <h1>Edit Post</h1>
        <form onSubmit={handleSubmit}>
          <div className="edit-notebook-info-2">
              <label className="edit-notebook-label">Let others know a little about your writings intentions!</label>
              <label>Keep it short and sweet, let your art speak for itself!</label>
              <textarea
                  value={message}
                  rows={8}
                  cols={50}
                  onChange={(e) => setMessage(e.target.value)}
                  required
              />

              <p className={validationErrors.message ? "notebook-errors" : 'notebook-about-edit'}>{validationErrors.message ? `${validationErrors.message}` : `${message.length}/100` }</p>
          </div>
          <div className="edit-notebook-button-container">
            <button type="submit" className="modal-button edit-notebook-button">Submit Changes</button>
          </div>
        </form>
    </div>

    )
}


export default EditPostFormModal
