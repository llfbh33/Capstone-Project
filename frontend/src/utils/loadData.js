import { thunkLoadNotebooks } from "../redux/notebook";
import { thunkLoadEntries } from "../redux/entry";
<<<<<<< HEAD
import { thunkLoadUsers } from "../redux/users";
=======
// import { thunkLoadUsers } from "../redux/users";
>>>>>>> 6284ff2c8ce9df06d22eb1d4115c1d64d5b8abb2

const loadState = async (dispatch) => {
  await dispatch(thunkLoadNotebooks());
  await dispatch(thunkLoadEntries());
  await dispatch(thunkLoadUsers())
};


export default loadState;
