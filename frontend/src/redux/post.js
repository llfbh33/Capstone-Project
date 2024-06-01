// do not think we are using this reducer any more - think about deleting it if the entry reducer works find
const LOAD_POSTS = 'posts/LOAD_POSTs';
const CREATE_POST = 'post/CREATE_POST';
const EDIT_POST = 'post/EDIT_POST';
const DELETE_POST = 'post/DELETE_POST';
const CLEAR_POSTS = 'posts/CLEAR_POSTS';

const loadPosts = (posts) => ({
  type: LOAD_POSTS,
  payload: posts
});

const createPost = (post) => ({
    type: CREATE_POST,
    post
  });

const editPost = (post) => ({
    type: EDIT_POST,
    post
})

const deletePost = (postId) => ({
    type: DELETE_POST,
    postId
  });

  export const clearPosts = () => ({
    type: CLEAR_POSTS,
  });


export const thunkLoadPosts = () => async (dispatch) => {
    const response = await fetch('/api/posts');
    if (response.ok) {
        const data = await response.json();
        return dispatch(loadPosts(data.posts));
    } else {
        return { server: "Something went wrong. Please try again" }
    }
};


export const thunkCreatePost = (post) => async (dispatch) => {
    const response = await fetch("/api/posts/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        entry_id: post.entryId,
        message: post.message,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      return dispatch(createPost(data));
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
        entry_id: post.entryId,
        message: post.message,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      return dispatch(editPost(data));
    } else {
      const errors = await response.json();
      return errors;
    }
};


export const thunkDeletePost = (postId) => async (dispatch) => {
    const response = await fetch(`/api/posts/${postId}/delete`);
    if (response.ok) {
        return dispatch(deletePost(postId))
    } else {
      const errors = await response.json();
      return errors;
    }
  };

const initialState = {};

function postReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_POSTS: {
        const newState = {...state};
        action.payload.forEach((post) => {
            newState[post.id] = post
        });
        return newState
    }
    case CREATE_POST: {
        const newState = {...state};
        newState[action.post.id] = action.post;
        return newState;
    }
    case EDIT_POST: {
        const newState = {...state};
        newState[action.post.id] = action.post;
        return newState;
    }
    case DELETE_POST: {
        const newState = {...state}
        delete newState[action.postId]
        return newState
    }
    case CLEAR_POSTS: {
        return initialState;
    }
    default:
      return state;
  }
}

// export default postReducer;
