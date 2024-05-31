const LOAD_USER_NOTEBOOKS = 'notebooks/LOAD_USER_NOTEBOOKS';
const CREATE_NOTEBOOK = 'notebooks/CREATE_NOTEBOOK';
const EDIT_NOTEBOOK = 'notebook/EDIT_NOTEBOOK';
const DELETE_NOTEBOOK = 'notebooks/DELETE_NOTEBOOK';
const CLEAR_NOTEBOOKS = 'notebooks/CLEAR_NOTEBOOKS';

const loadNotebooks = (notebooks) => ({
  type: LOAD_USER_NOTEBOOKS,
  payload: notebooks
});

const createNotebook = (notebook) => ({
    type: CREATE_NOTEBOOK,
    notebook
  });

const editNotebook = (notebook) => ({
    type: EDIT_NOTEBOOK,
    notebook
})

const deleteNotebook = (notebookId) => ({
    type: DELETE_NOTEBOOK,
    notebookId
  });

  export const clearNotebooks = () => ({
    type: CLEAR_NOTEBOOKS,
  });


export const thunkLoadNotebooks = () => async (dispatch) => {
    const response = await fetch('/api/notebooks');
    if (response.ok) {
        const data = await response.json();
        return dispatch(loadNotebooks(data.notebooks));
    } else {
        return { server: "Something went wrong. Please try again" }
    }
};


export const thunkCreateNotebook = (notebook) => async (dispatch) => {
    const response = await fetch("/api/notebooks/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: notebook.userId,
        name: notebook.name,
        about: notebook.about,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data)
      return dispatch(createNotebook(data));
    } else {
      const errors = await response.json();
      return errors;
    }
};


export const thunkEditNotebook = (notebook) => async (dispatch) => {
    console.log(notebook)
    const response = await fetch(`/api/notebooks/${notebook.id}/edit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: notebook.userId,
        name: notebook.name,
        about: notebook.about,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data)
      return dispatch(editNotebook(data));
    } else {
      const errors = await response.json();
      console.log(errors)
      return errors;
    }
};


export const thunkDeleteNotebook = (notebookId) => async (dispatch) => {
    const response = await fetch(`/api/notebooks/${notebookId}/delete`);
    if (response.ok) {
        return dispatch(deleteNotebook(notebookId))
    } else {
      const errors = await response.json();
      return errors;
    }
  };

const initialState = {};

function notebookReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_USER_NOTEBOOKS: {
        const newState = {...state};
        action.payload.forEach((notebook) => {
            newState[notebook.id] = notebook
        });
        return newState
    }
    case CREATE_NOTEBOOK: {
        const newState = {...state};
        newState[action.notebook.id] = action.notebook;
        return newState;
    }
    case EDIT_NOTEBOOK: {
        const newState = {...state};
        newState[action.notebook.id] = action.notenook;
        return newState;
    }
    case DELETE_NOTEBOOK: {
        const newState = {...state}
        delete newState[action.notebookId]
        return newState
    }
    case CLEAR_NOTEBOOKS: {
        return initialState;
    }
    default:
      return state;
  }
}

export default notebookReducer;
