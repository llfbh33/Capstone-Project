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
        <div className='comment-modal-main-container' >
            <h3 className='comment-modal-titles'>{`Are you sure you want to delete this comment?`}</h3>
            <div className="comment-modal">
                <button className="modal-button delete-comment" onClick={deleteComment}>Yes, delete</button>
                <button className="modal-button delete-comment" onClick={doNotDelete}>No, do not delete</button>
            </div>
        </div>
    )
}

export default DeleteCommentModal;
