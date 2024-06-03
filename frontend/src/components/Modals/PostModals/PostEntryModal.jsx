import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { thunkCreatePost, thunkLoadEntries } from "../../../redux/entry";
import { useModal } from "../../../context/Modal";
import { useNavigate } from "react-router-dom";


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
        <div id='notebook-edit-modal'>
            <h1>{`Post "${entry.name}" to the public feed?`}</h1>
            <div>
                <div>Would you like to include a message with your post?</div>
                <div>This is not necessary, but it can help others understand what you are trying to acheive with your writing.</div>
                <input
                    type='text'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}>
                </input>
                {validationErrors.message ? <p className="error-validation">{validationErrors.message}</p> : <p>{`${message.length}/250`}</p>}
            </div>
            <div id='remove-post-button-container'>
                <button className="modal-button delete-comment-button" onClick={postEntry}>Yes, Make Public</button>
                <button className="modal-button delete-comment-button" onClick={doNotPost}>No, Keep Private</button>
            </div>
        </div>
    );
}

export default PostPostModal;
