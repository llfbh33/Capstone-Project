import { useDispatch } from 'react-redux';
import { useState } from 'react';

import { thunkEditComment, thunkLoadEntries } from '../../../redux/entry';
import { useModal } from '../../../context/Modal'
import './CommentModals.css'


function EditCommentModal({comment}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [updateComment, setUpdateComment] = useState(comment.comment)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (updateComment.length > 600 || updateComment <= 0) {
            return
        }

        const editedComment = {
            id: comment.id,
            userId: comment.user_id,
            entryId: comment.entry_id,
            comment: updateComment
        }

        await dispatch(thunkEditComment(editedComment));
        await dispatch(thunkLoadEntries())  // needs to be included so that the comment auto sets
        closeModal();
    };


    return (
        <div id='edit-comment-modal' >
            <form onSubmit={handleSubmit}>
                <div className='edit-comment-inner-form'>
                    <label className='edit-comment-label'>Edit Comment:</label>
                    <textarea
                        className='edit-comment-input'
                        rows={16}
                        type='text'
                        value={updateComment}
                        onChange={e => setUpdateComment(e.target.value)}
                    />
                    <div className='comment-validation-and-button'>
                        <p className={updateComment.length > 600 || updateComment.length <= 0? 'comment-error' : 'comment-length'}>{`${updateComment.length}/600`}</p>
                        <button className=' edit-comment-button modal-button' type='submit'>Edit Comment</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditCommentModal
