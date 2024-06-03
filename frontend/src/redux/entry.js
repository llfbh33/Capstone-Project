const LOAD_USER_ENTRIES = 'entries/LOAD_USER_ENTRIES';
const CREATE_ENTRY = 'entry/CREATE_ENTRY';
const EDIT_ENTRY = 'entry/EDIT_ENTRY';
const DELETE_ENTRY = 'entry/DELETE_ENTRY';
const CLEAR_ENTRIES = 'entries/CLEAR_ENTRIES';

const CREATE_COMMENT = 'comment/CREATE_COMMENT'
const EDIT_COMMENT = 'comment/EDIT_COMMENT'
const DELETE_COMMENT = 'comment/DELETE_COMMENT'

const CREATE_POST = 'post/CREATE_POST';
const EDIT_POST = 'post/EDIT_POST';
const DELETE_POST = 'post/DELETE_POST';

// middleware functions for updating entries state
const loadEntries = (entries) => ({
  type: LOAD_USER_ENTRIES,
  entries
});

const createEntry = (entry) => ({
    type: CREATE_ENTRY,
    entry
});

const editEntry = (entry) => ({
    type: EDIT_ENTRY,
    entry
});

const deleteEntry = (entryId) => ({
    type: DELETE_ENTRY,
    entryId
});

  export const clearEntries = () => ({
    type: CLEAR_ENTRIES,
});

// middleware functions for updating comments state
const createComment = (comment) => ({
  type: CREATE_COMMENT,
  comment
});

const editComment = (comment) => ({
  type: EDIT_COMMENT,
  comment
});

const deleteComment = (comment) => ({
  type: DELETE_COMMENT,
  comment
});

// middleware functions for updating posts state
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


// thunks for changing entries in the database
export const thunkLoadEntries = () => async (dispatch) => {
    const response = await fetch('/api/entries');
    if (response.ok) {
        const data = await response.json();
        return dispatch(loadEntries(data));
    } else {
        return { server: "Something went wrong. Please try again" }
    }
};


export const thunkCreateEntry = (entry) => async (dispatch) => {
    const response = await fetch("/api/entries/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            user_id: entry.userId,
            notebook_id: entry.notebookId,
            name: entry.name,
            content: entry.content,
        }),
    });
    if (response.ok) {
        const data = await response.json();
        return dispatch(createEntry(data));
    } else {
        const errors = await response.json();
        return errors;
    }
};


export const thunkEditEntry = (entry) => async (dispatch) => {
  console.log('entry obj ----->', entry)
    const response = await fetch(`/api/entries/${entry.id}/edit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            user_id: entry.userId,
            notebook_id: entry.notebookId,
            name: entry.name,
            content: entry.content,
            is_public: entry.isPublic
        }),
    });
    if (response.ok) {
        const data = await response.json();
        return dispatch(editEntry(data));
    } else {
        const errors = await response.json();
        return errors;
    }
};


export const thunkDeleteEntry = (entryId) => async (dispatch) => {
  console.log(entryId)
    const response = await fetch(`/api/entries/${entryId}/delete`);
    if (response.ok) {
        return dispatch(deleteEntry(entryId))
    } else {
        const errors = await response.json();
        return errors;
    }
  };

// thunks for changing comments in the database
export const thunkCreateComment = (comment) => async (dispatch) => {
    const response = await fetch("/api/comments/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            user_id: comment.userId,
            entry_id: comment.entryId,
            comment: comment.comment,
        }),
    });
    if (response.ok) {
        const data = await response.json();
        return dispatch(createComment(data));
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
            entry_id: comment.entryId,
            comment: comment.comment,
        }),
    });
    if (response.ok) {
        const data = await response.json();
        return dispatch(editComment(data));
    } else {
        const errors = await response.json();
        return errors;
    }
};

export const thunkDeleteComment = (comment) => async (dispatch) => {
    const response = await fetch(`/api/comments/${comment.id}/delete`);
    if (response.ok) {
        return dispatch(deleteComment(comment))
    } else {
        const errors = await response.json();
        return errors;
    }
};

// thunks for changing posts in the database
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
const response = await fetch(`/api/posts/${post.entryId}/edit`, {
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

export const thunkDeletePost = (post) => async (dispatch) => {
const response = await fetch(`/api/posts/${post.id}/delete`);
if (response.ok) {
    return dispatch(deletePost(post))
} else {
  const errors = await response.json();
  return errors;
}
};

const initialState = {};

function entryReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_USER_ENTRIES: {
        const newState = {...state};
        action.entries.forEach((entry) => {
            newState[entry.id] = entry
        });
        return newState
    }
    case CREATE_ENTRY: {
        const newState = {...state};
        newState[action.entry.id] = action.entry;
        return newState;
    }
    case EDIT_ENTRY: {
        const newState = {...state};
        newState[action.entry.id] = action.entry;
        return newState;
    }
    case DELETE_ENTRY: {
        const newState = {...state}
        delete newState[action.entryId]
        return newState
    }
    case CREATE_COMMENT: {
      const newState = {...state};
      newState[action.comment.entry_id].comments.push(action.comment)
      return newState;
    }
    case EDIT_COMMENT: {
        const newState = {...state};
        const comments = newState[action.comment.entry_id].comments;
        const updateComment = comments.find(comment => comment.id = action.comment.id);
        comments.splice(comments.indexOf(updateComment), 1, action.comment);
        newState[action.comment.entry_id].comments = comments; // may not need to do this because of the way memory and pointers works.  test when you have time
        return newState
    }
    case DELETE_COMMENT: {
        const newState = {...state};
        const comments = newState[action.comment.entry_id].comments;
        newState[action.comment.entry_id].comments.splice(comments.indexOf(action.comment), 1)
        return newState
    }
    case CREATE_POST: {
      const newState = {...state};
      newState[action.post.entry_id]['post'] = action.post
      return newState
    }
    case EDIT_POST: {
      const newState = {...state};
      newState[action.post.entry_id].post = action.post
      return newState
    }
// This delete of a post is good, but it does not adjust for the fact that the is_public
// boolean for the entry is now set to false
    case DELETE_POST: {
      const newState = {...state};
      let adjust_entry = newState[action.post.entry_id]
      adjust_entry = Object.keys(adjust_entry)
          .filter(key => key !== 'post')
          .reduce((newObj, key) => {
            newObj[key] = adjust_entry[key];
            return newObj;
          }, {});
      newState[adjust_entry.id] = adjust_entry;
      newState[adjust_entry.id].is_public = false;
      return newState
    }
    case CLEAR_ENTRIES: {
        return initialState;
    }
    default:
      return state;
  }
}

export default entryReducer;
