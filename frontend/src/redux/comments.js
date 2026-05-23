import { thunkGetCurrentUserActivities } from "./activity";
import { thunkLoadPosts } from "./posts";
import { thunkLoadEntries } from "./entry";

const CREATE_COMMENT = 'comment/CREATE_COMMENT'
const EDIT_COMMENT = 'comment/EDIT_COMMENT'
const DELETE_COMMENT = 'comment/DELETE_COMMENT'
const CLEAR_COMMENTS = 'comment/CLEAR_COMMENTS'



const createComment = (comment) => ({
    type: CREATE_COMMENT,
    comment
});

const editComment = (comment) => ({
    type: EDIT_COMMENT,
    comment
});

const deleteComment = (commentId) => ({
    type: DELETE_COMMENT,
    commentId
});

export const clearComments = () => ({
    type: CLEAR_COMMENTS,
})



// CREATE A LOAD COMMENTS ROUTE

export const thunkCreateComment = (comment) => async (dispatch) => {
    const response = await fetch("/api/comments/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            user_id: comment.userId,
            post_id: comment.postId,
            comment: comment.comment,
        }),
    });
    if (response.ok) {
        const data = await response.json();
        await dispatch(createComment(data));
        await dispatch(thunkLoadEntries());
        await dispatch(thunkLoadPosts());
        await dispatch(thunkGetCurrentUserActivities());
        return data;
    } else {
        const errors = await response.json();
        return errors;
    }
};

export const thunkEditComment = (comment) => async (dispatch) => {
    const response = await fetch(`/api/comments/${comment.id}/edit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            user_id: comment.userId,
            post_id: comment.postId,
            comment: comment.comment,
        }),
    });
    if (response.ok) {
        const data = await response.json();
        await dispatch(editComment(data));
        await dispatch(thunkLoadEntries());
        await dispatch(thunkLoadPosts());
        await dispatch(thunkGetCurrentUserActivities());
        return data;
    } else {
        const errors = await response.json();
        return errors;
    }
};

export const thunkDeleteComment = (commentId) => async (dispatch) => {
    console.log('comment id', commentId)
    const response = await fetch(`/api/comments/${commentId}/delete`);
    if (response.ok) {
        await dispatch(deleteComment(commentId));
        await dispatch(thunkLoadEntries());
        await dispatch(thunkLoadPosts());
        await dispatch(thunkGetCurrentUserActivities());
        return;
    } else {
        const errors = await response.json();
        return errors;
    }
};

const initialState = {};

function commentsReducer(state = initialState, action) {
    switch (action.type) {
        // case LOAD_USER_ENTRIES: {
        //     const newState = {...state};
        //     action.entries.forEach((entry) => {
        //         newState[entry.id] = entry
        //     });
        //     return newState
        // }

        case CREATE_COMMENT: {
            const newState = { ...state };
            newState[action.comment.id] = action.comment
            return newState;
        }
        case EDIT_COMMENT: {
            const newState = { ...state };
            newState[action.comment.id] = action.comment;
            return newState;
        }
        case DELETE_COMMENT: {
            const newState = { ...state }
            delete newState[action.commentId]
            return newState
        }
        case CLEAR_COMMENTS: {
            return initialState;
        }
        default:
            return state;
    }
}

export default commentsReducer;