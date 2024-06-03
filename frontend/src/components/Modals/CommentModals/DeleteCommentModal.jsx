import { useDispatch } from 'react-redux';

import { thunkDeleteComment, thunkLoadEntries } from '../../../redux/entry';
import { useModal } from '../../../context/Modal';
import './CommentModals.css';


function DeleteCommentModal({comment}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const deleteComment = async (e) => {
        e.preventDefault();

        await dispatch(thunkDeleteComment(comment));
        await dispatch(thunkLoadEntries());
        closeModal();
    };

    const doNotDelete = () => {
        closeModal();
    };

    return (
        <div id='delete-comment-modal' >
            <h3>{`Are you sure you want to delete this comment?`}</h3>
            <div className="modal-yes-no">
                <button className="modal-button delete-comment-button" onClick={deleteComment}>Yes, delete</button>
                <button className="modal-button delete-comment-button" onClick={doNotDelete}>No, do not delete</button>
            </div>
        </div>
    )
}

export default DeleteCommentModal;
