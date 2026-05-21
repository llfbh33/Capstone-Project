import { useDispatch } from "react-redux"
import { thunkLoadEntries } from "../../../redux/entry"
import { thunkPublicationOfPost } from "../../../redux/posts";
import { useModal } from "../../../context/Modal/Modal";


function RemovePostModal({post}) {
    const dispatch = useDispatch()
    const { closeModal } = useModal();

    console.log(post)

    const removePublication = async () => {
        const safePost = {
            id: post.id,
            is_active: false
        }

        await dispatch(thunkPublicationOfPost(safePost))
        await dispatch(thunkLoadEntries())
        await closeModal()
        return
    }

    const doNotRemove = () => {
        closeModal()
        return
    }

    return (
        <div id='post-remove-modal-container'>
            <h2 className="delete-post-wrap">{`Are you sure you want to remove "${post?.name}" from the public feed?`}</h2>
            <h4 className="post-remove-disclaimer">{`Don't worry, all the comments on your post will stay with your entry so you can continue to have the advice of other members.`}</h4>
            <div id='remove-post-button-container'>
                <button className="modal-button conformation-btn" onClick={removePublication}>Yes, Remove Post</button>
                <button className="modal-button conformation-btn" onClick={doNotRemove}>No, Keep Post Public</button>
            </div>
        </div>
    )
}

export default RemovePostModal
