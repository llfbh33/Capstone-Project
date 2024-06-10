import { useDispatch } from "react-redux"
import { thunkDeletePost, thunkLoadEntries } from "../../../redux/entry"
import { useModal } from "../../../context/Modal"


function RemovePostModal({post}) {
    const dispatch = useDispatch()
    const { closeModal } = useModal();

    const deletePost = async () => {
        await dispatch(thunkDeletePost(post.post))
        await dispatch(thunkLoadEntries())
        await closeModal()
        return
    }

    const doNotDelete = () => {
        closeModal()
        return
    }

    return (
        <div id='post-remove-modal-container'>
            <h2 className="delete-post-wrap">{`Are you sure you want to remove "${post?.name}" from the public feed?`}</h2>
            <h4 className="post-remove-disclaimer">{`Don't worry, all the comments on your post will stay with your entry so you can continue to have the advice of other members.`}</h4>
            <div id='remove-post-button-container'>
                <button className="modal-button conformation-btn" onClick={deletePost}>Yes, Remove Post</button>
                <button className="modal-button conformation-btn" onClick={doNotDelete}>No, Keep Post Public</button>
            </div>
        </div>
    )
}

export default RemovePostModal
