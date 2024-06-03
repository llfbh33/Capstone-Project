import { thunkLoadNotebooks } from "../redux/notebook";
import { thunkLoadEntries } from "../redux/entry";
import { thunkLoadUsers } from "../redux/users";

const loadState = async (dispatch) => {
  await dispatch(thunkLoadNotebooks());
  await dispatch(thunkLoadEntries());
  await dispatch(thunkLoadUsers())
};


export default loadState;
