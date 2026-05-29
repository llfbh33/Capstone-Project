import { thunkGetCurrentUserActivities } from "./activity";

const LOAD_USER_ENTRIES = 'entries/LOAD_USER_ENTRIES';
const CREATE_ENTRY = 'entry/CREATE_ENTRY';
const EDIT_ENTRY = 'entry/EDIT_ENTRY';
const DELETE_ENTRY = 'entry/DELETE_ENTRY';
const CLEAR_ENTRIES = 'entries/CLEAR_ENTRIES';



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
            is_public: entry.isPublic,
            read_length: entry.read_length,
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

export const thunkEntriesUpdateReadLength = () => async () => {
    const response = await fetch(`/api/entries/read_length`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        const errors = await response.json();
        return errors;
    }
}


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





const initialState = {};

function entryReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_USER_ENTRIES: {
        const newState = {};
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
    case CLEAR_ENTRIES: {
        return initialState;
    }
    default:
      return state;
  }
}

export default entryReducer;
