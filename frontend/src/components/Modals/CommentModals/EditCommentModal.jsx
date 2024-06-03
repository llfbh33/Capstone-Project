import { useDispatch } from 'react-redux';
<<<<<<< HEAD
import { useState } from 'react';

import { thunkEditComment, thunkLoadEntries } from '../../../redux/entry';
import { useModal } from '../../../context/Modal'
import './CommentModals.css'
=======

import { useModal } from '../../../context/Modal'
import { thunkEditComment, thunkLoadEntries } from '../../../redux/entry';

import './CommentModals.css'
import { useState } from 'react';

>>>>>>> 6284ff2c8ce9df06d22eb1d4115c1d64d5b8abb2


function EditCommentModal({comment}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [updateComment, setUpdateComment] = useState(comment.comment)
<<<<<<< HEAD
=======
    const [validationErrors, setValidationErrors] = useState({})
>>>>>>> 6284ff2c8ce9df06d22eb1d4115c1d64d5b8abb2

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (updateComment.length > 600) {
<<<<<<< HEAD
=======
            console.log('did not work')
>>>>>>> 6284ff2c8ce9df06d22eb1d4115c1d64d5b8abb2
            return
        }

        const editedComment = {
            id: comment.id,
            userId: comment.user_id,
            entryId: comment.entry_id,
            comment: updateComment
        }

        await dispatch(thunkEditComment(editedComment));
<<<<<<< HEAD
        await dispatch(thunkLoadEntries())  // needs to be included so that the comment auto sets
=======
        await dispatch(thunkLoadEntries())
>>>>>>> 6284ff2c8ce9df06d22eb1d4115c1d64d5b8abb2
        closeModal();
    };


    return (
        <div id='edit-comment-modal' >
            <form onSubmit={handleSubmit}>
<<<<<<< HEAD

=======
>>>>>>> 6284ff2c8ce9df06d22eb1d4115c1d64d5b8abb2
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
                        <p className={updateComment.length > 600 ? 'comment-error' : 'comment-length'}>{`Comment must be under: ${updateComment.length}/600`}</p>
                        <button className=' edit-comment-button modal-button' type='submit'>Edit Comment</button>
                    </div>
                </div>
<<<<<<< HEAD

=======
>>>>>>> 6284ff2c8ce9df06d22eb1d4115c1d64d5b8abb2
            </form>
        </div>
    )
}

export default EditCommentModal
