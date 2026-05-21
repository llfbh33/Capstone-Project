import { thunkGetCurrentUserActivities } from "./activity";

const LOAD_USER_ENTRIES = 'entries/LOAD_USER_ENTRIES';
const CREATE_ENTRY = 'entry/CREATE_ENTRY';
const EDIT_ENTRY = 'entry/EDIT_ENTRY';
const DELETE_ENTRY = 'entry/DELETE_ENTRY';
const CLEAR_ENTRIES = 'entries/CLEAR_ENTRIES';

const CREATE_COMMENT = 'comment/CREATE_COMMENT'
const EDIT_COMMENT = 'comment/EDIT_COMMENT'
const DELETE_COMMENT = 'comment/DELETE_COMMENT'


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



// thunks for loading entries from the database
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
        await dispatch(createEntry(data));
        await dispatch(thunkGetCurrentUserActivities());
        return data;
    } else {
        const errors = await response.json();
        return errors;
    }
};


export const thunkEditEntry = (entry) => async (dispatch) => {
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
        await dispatch(editEntry(data));
        await dispatch(thunkGetCurrentUserActivities());
        return data;
    } else {
        const errors = await response.json();
        return errors;
    }
};


export const thunkDeleteEntry = (entryId) => async (dispatch) => {
    const response = await fetch(`/api/entries/${entryId}/delete`);
    if (response.ok) {
        await dispatch(deleteEntry(entryId));
        await dispatch(thunkGetCurrentUserActivities());
        return;
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
        await dispatch(createComment(data));
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
            entry_id: comment.entryId,
            comment: comment.comment,
        }),
    });
    if (response.ok) {
        const data = await response.json();
        await dispatch(editComment(data));
        await dispatch(thunkGetCurrentUserActivities());
        return data;
    } else {
        const errors = await response.json();
        return errors;
    }
};

export const thunkDeleteComment = (comment) => async (dispatch) => {
    const response = await fetch(`/api/comments/${comment.id}/delete`);
    if (response.ok) {
        await dispatch(deleteComment(comment));
        await dispatch(thunkGetCurrentUserActivities());
        return;
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
        const comments = newState[action.comment.entry_id].comments;// what is comment
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
    case CLEAR_ENTRIES: {
        return initialState;
    }
    default:
      return state;
  }
}

export default entryReducer;
