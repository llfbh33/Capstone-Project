import { thunkGetCurrentUserActivities } from "./activity";


const LOAD_POSTS = 'posts/LOAD_POSTS'
const CREATE_POST = 'post/CREATE_POST';
const EDIT_POST = 'post/EDIT_POST';
const DELETE_POST = 'post/DELETE_POST';
const CLEAR_POSTS = 'posts/CLEAR_POSTS';


// Middleware for updating posts state
const loadPosts = (posts) => ({
    type: LOAD_POSTS,
    posts
})
const createPost = (post) => ({
    type: CREATE_POST,
    post
});

const editPost = (post) => ({
    type: EDIT_POST,
    post
})

const deletePost = (post) => ({
    type: DELETE_POST,
    post
});

export const clearPosts = () => ({
    type: CLEAR_POSTS,
});


// thunks for changing posts in the database
export const thunkLoadPosts = () => async (dispatch) => {
    const response = await fetch('/api/posts');
    if (response.ok) {
        const data = await response.json();
        return dispatch(loadPosts(data));
    } else {
        return { server: "Something went wrong. Please try again" }
    }
};


export const thunkCreatePost = (post) => async (dispatch) => {
     console.log('POST IN THUNK: ', post)
    const response = await fetch("/api/posts/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            entry_id: post.entryId,
            title: post.title,
            message: post.message,
        }),

    });
    console.log('RESPONSE: ', response)
    if (response.ok) {
        const data = await response.json();
        await dispatch(createPost(data));
        await dispatch(thunkGetCurrentUserActivities());
        return data;
    } else {
        const errors = await response.json();
        return errors;
    }
};

export const thunkEditPost = (post) => async (dispatch) => {
    const response = await fetch(`/api/posts/${post.id}/edit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: post.title,
            message: post.message,
            comments_enabled: post.comments_enabled
        }),
    });
    if (response.ok) {
        const data = await response.json();
        await dispatch(editPost(data));
        await dispatch(thunkGetCurrentUserActivities());
        return data;
    } else {
        const errors = await response.json();
        return errors;
    }
};


/*-----SHOULD NO LONGER USE--------*/
export const thunkDeletePost = (post) => async (dispatch) => {
    const response = await fetch(`/api/posts/${post.id}/delete`);
    if (response.ok) {
        await dispatch(deletePost(post));
        await dispatch(thunkGetCurrentUserActivities());
        return;
    } else {
        const errors = await response.json();
        return errors;
    }
};

const initialState = {};

function postsReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_POSTS: {
            const newState = {};
            action.posts.forEach((post) => {
                newState[post.id] = post
            });
            return newState
        }
        case CREATE_POST: {
            const newState = { ...state };
            newState[action.post.id] = action.post
            return newState
        }
        case EDIT_POST: {
            const newState = { ...state };
            newState[action.post.id] = action.post
            return newState
        }
        // This delete of a post is good, but it does not adjust for the fact that the is_public
        // boolean for the entry is now set to false
        // WE ARE NO LONGER ALLOWING THE DELETION OF A POST
        // case DELETE_POST: {
        //     const newState = { ...state };
        //     let adjust_entry = newState[action.post.entry_id]
        //     adjust_entry = Object.keys(adjust_entry)
        //         .filter(key => key !== 'post')
        //         .reduce((newObj, key) => {
        //             newObj[key] = adjust_entry[key];
        //             return newObj;
        //         }, {});
        //     newState[adjust_entry.id] = adjust_entry;
        //     newState[adjust_entry.id].is_public = false;
        //     return newState
        // }
        case CLEAR_POSTS: {
            return initialState;
        }
        default:
            return state;
    }
}

export default postsReducer;
