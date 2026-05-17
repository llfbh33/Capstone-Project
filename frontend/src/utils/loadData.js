import { thunkLoadNotebooks } from "../redux/notebook";
import { thunkLoadEntries } from "../redux/entry";
import { thunkLoadUsers } from "../redux/users";
import { thunkGetCurrentUserActivities } from "../redux/activity";

const loadState = async (dispatch) => {
  await dispatch(thunkLoadNotebooks());
  await dispatch(thunkLoadEntries());
  await dispatch(thunkLoadUsers());
  await dispatch(thunkGetCurrentUserActivities());
};


export default loadState;
