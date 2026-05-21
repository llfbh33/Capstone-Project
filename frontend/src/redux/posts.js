import { thunkGetCurrentUserActivities } from "./activity";


const LOAD_POSTS = 'posts/LOAD_POSTS'
const CREATE_POST = 'post/CREATE_POST';
const EDIT_POST = 'post/EDIT_POST';
const PUBLICATION_OF_POST = 'post/PUBLICATION_OF_POST';
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

const publicationOfPost = (post) => ({
    type: PUBLICATION_OF_POST,
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
            comments_enabled: post.comments_enabled,
            is_active: post.is_active
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


export const thunkPublicationOfPost = (post) => async (dispatch) => {
    const response = await fetch(`/api/posts/${post.id}/publication`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            is_active: post.is_active
        }), 
    });
    if (response.ok) {
        await dispatch(publicationOfPost(post));
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
        case PUBLICATION_OF_POST: {
            const newState = { ...state };
            newState[action.post.id] = action.post
            return newState
        }
        case CLEAR_POSTS: {
            return initialState;
        }
        default:
            return state;
    }
}

export default postsReducer;
