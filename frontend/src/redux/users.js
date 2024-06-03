const LOAD_USERS = 'users/LOAD_USERS';

const loadUsers = ({users}) => ({
  type: LOAD_USERS,
  users
});


export const thunkLoadUsers = () => async (dispatch) => {
    const response = await fetch('/api/users');
    if (response.ok) {
        const data = await response.json();
        return dispatch(loadUsers(data));
    } else {
        return { server: "Something went wrong. Please try again" }
    }
};

const initialState = {};

function usersReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_USERS: {
        const newState = {...state};
        action.users.forEach((user) => {
            newState[user.id] = user
        });
        return newState
    }
    default:
      return state;
  }
}

export default usersReducer;
