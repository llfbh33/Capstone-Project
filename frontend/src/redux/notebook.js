const LOAD_USER_NOTEBOOKS = 'notebooks/LOAD_USER_NOTEBOOKS';
// const REMOVE_USER = 'session/removeUser';

const loadUserNotebooks = (notebooks) => ({
  type: LOAD_USER_NOTEBOOKS,
  payload: notebooks
});


export const thunkLoadUserNotebooks = () => async (dispatch) => {
    const response = await fetch('/api/notebooks');
    if (response.ok) {
        const data = await response.json();
        return dispatch(loadUserNotebooks(data));
    } else {
        return { server: "Something went wrong. Please try again" }
    }
};

const initialState = {};

function notebookReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_USER_NOTEBOOKS: {
        const newState = {...state};
        action.notebooks.forEach((notebook) => {
            newState[notebook.id] = notebook
        });
        return newState
    }
    default:
      return state;
  }
}

export default notebookReducer;
