const LOAD_USER_ENTRIES = 'entries/LOAD_USER_ENTRIES';
const CREATE_ENTRY = 'entry/CREATE_ENTRY';
const EDIT_ENTRY = 'entry/EDIT_ENTRY';
const DELETE_ENTRY = 'entry/DELETE_ENTRY';
const CLEAR_ENTRIES = 'entries/CLEAR_ENTRIES';

const loadEntries = (entries) => ({
  type: LOAD_USER_ENTRIES,
  payload: entries
});

const createEntry = (entry) => ({
    type: CREATE_ENTRY,
    entry
  });

const editEntry = (entry) => ({
    type: EDIT_ENTRY,
    entry
})

const deleteEntry = (entryId) => ({
    type: DELETE_ENTRY,
    entryId
  });

  export const clearEntries = () => ({
    type: CLEAR_ENTRIES,
  });


export const thunkLoadEntries = () => async (dispatch) => {
    const response = await fetch('/api/entries');
    if (response.ok) {
        const data = await response.json();
        return dispatch(loadEntries(data.entries));
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
    const response = await fetch(`/api/notebooks/${entry.id}/edit`, {
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
      return dispatch(editEntry(data));
    } else {
      const errors = await response.json();
      return errors;
    }
};


export const thunkDeleteEntry = (entryId) => async (dispatch) => {
    const response = await fetch(`/api/entries/${entryId}/delete`);
    if (response.ok) {
        return dispatch(deleteEntry(entryId))
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
        action.payload.forEach((entry) => {
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
