const LOAD_USER_NOTEBOOKS = 'notebooks/LOAD_USER_NOTEBOOKS';
// const REMOVE_USER = 'session/removeUser';

const loadNotebooks = (notebooks) => ({
  type: LOAD_USER_NOTEBOOKS,
  payload: notebooks
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
    default:
      return state;
  }
}

export default notebookReducer;
