import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { thunkCreatePost, thunkLoadEntries } from "../../../redux/entry";
import { useModal } from "../../../context/Modal";
import { useNavigate } from "react-router-dom";
import './PostModals.css'


function PostPostModal({entry}) {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [message, setMessage] = useState(' ');
    const [validationErrors, setValidationErrors] = useState({});
    const { closeModal } = useModal();

    useEffect(() => {
        const errors = {};
        if (message.length <= 0) setMessage(' ')
        if (message.length > 250) errors.message = 'Message can not be more than 100 characters'
        setValidationErrors(errors)
    }, [message])

    const postEntry = async (e) => {
        e.preventDefault();

        if (Object.values(validationErrors).length) return;

        const serverResponse = await dispatch(thunkCreatePost ({
            entryId: entry.id,
            message,
            })
        );

        if (serverResponse.name) {
            setValidationErrors(serverResponse);
        } else {
            await dispatch(thunkLoadEntries());
            navigate(`/public/${entry.id}`)
            await closeModal();
        }
    }

    const doNotPost = () => {
        closeModal();
    }

    return (
        <div className='post-modal-main-container'>
            <h1 className="post-modal-titles">{`Post "${entry.name}" to the public feed?`}</h1>
            <div className="post-modal-form-container">
                <div className="post-modal-label">Would you like to include a message with your post?</div>
                <div className="post-modal-label-2">This is not necessary, but it can help others understand what you are trying to acheive with your writing.</div>
                <textarea
                    type='text'
                    rows={7}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}>
                </textarea>
                <p className={validationErrors.message ? "post-modal-errors" : 'post-modal-no-errors'}>{`${message.length}/250`}</p>
            </div>
            <div className='post-modal-conformation-btn-container'>
                <button className="modal-button conformation-btn" onClick={postEntry}>Yes, Make Public</button>
                <button className="modal-button conformation-btn" onClick={doNotPost}>No, Keep Private</button>
            </div>
        </div>
    );
}

export default PostPostModal;
