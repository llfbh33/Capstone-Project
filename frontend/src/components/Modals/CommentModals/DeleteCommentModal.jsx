import { useDispatch } from 'react-redux';

<<<<<<< HEAD
import { thunkDeleteComment, thunkLoadEntries } from '../../../redux/entry';
import { useModal } from '../../../context/Modal';
import './CommentModals.css';
=======
import { useModal } from '../../../context/Modal'
import { thunkDeleteComment } from '../../../redux/entry'

import './CommentModals.css'

>>>>>>> 6284ff2c8ce9df06d22eb1d4115c1d64d5b8abb2


function DeleteCommentModal({comment}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const deleteComment = async (e) => {
<<<<<<< HEAD
        e.preventDefault();

        await dispatch(thunkDeleteComment(comment));
        await dispatch(thunkLoadEntries());
=======
        await dispatch(thunkDeleteComment(comment));
>>>>>>> 6284ff2c8ce9df06d22eb1d4115c1d64d5b8abb2
        closeModal();
    };

    const doNotDelete = () => {
        closeModal();
    };

<<<<<<< HEAD
=======

>>>>>>> 6284ff2c8ce9df06d22eb1d4115c1d64d5b8abb2
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

<<<<<<< HEAD
export default DeleteCommentModal;
=======
export default DeleteCommentModal
>>>>>>> 6284ff2c8ce9df06d22eb1d4115c1d64d5b8abb2
