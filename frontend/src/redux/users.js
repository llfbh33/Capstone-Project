<<<<<<< HEAD
=======
// do not think we are using this reducer any more - think about deleting it if the entry reducer works find
>>>>>>> 6284ff2c8ce9df06d22eb1d4115c1d64d5b8abb2
const LOAD_USERS = 'users/LOAD_USERS';

const loadUsers = ({users}) => ({
  type: LOAD_USERS,
  users
});


export const thunkLoadUsers = () => async (dispatch) => {
<<<<<<< HEAD
=======
    console.log('here')
>>>>>>> 6284ff2c8ce9df06d22eb1d4115c1d64d5b8abb2
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
