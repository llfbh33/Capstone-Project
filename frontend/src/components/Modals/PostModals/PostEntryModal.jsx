import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { thunkLoadEntries } from "../../../redux/entry";
import { thunkCreatePost } from "../../../redux/posts";
import { useModal } from "../../../context/Modal/Modal";
import { useNavigate } from "react-router-dom";
import './PostModals.css'


function PostPostModal({entry}) {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [message, setMessage] = useState(' ');
    const [title, setTitle] = useState(entry.name)
    const [validationErrors, setValidationErrors] = useState({});
    const { closeModal } = useModal();

    useEffect(() => {
        const errors = {};
        if (message.length <= 0) setMessage(' ')
        if (message.length > 250) errors.message = 'Message can not be more than 250 characters'

        if (title.length > 150) errors.title = 'Title can not be more than 150 characters'
        setValidationErrors(errors)
    }, [message, title])

    const postEntry = async (e) => {
        e.preventDefault();

        if (Object.values(validationErrors).length) return;

        const serverResponse = await dispatch(thunkCreatePost ({
            entryId: entry.id,
            title,
            message,
            })
        );

        if (serverResponse.errors) {
            setValidationErrors(serverResponse.errors);
        } else {
            console.log(serverResponse.id)
            await dispatch(thunkLoadEntries());
            navigate(`/public/${serverResponse.id}`)
            closeModal();
        }
    }

    const doNotPost = () => {
        closeModal();
    }

    return (
        <div className='post-modal-main-container'>
            <h1 className="post-modal-titles">{`Publish your Entry?`}</h1>
            <div className="post-modal-form-container">
                <label>What would you like to label your post?</label>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <p className="post-modal-errors">{validationErrors.title ? validationErrors.title : ''}</p>
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
