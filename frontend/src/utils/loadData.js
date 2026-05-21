import { thunkLoadNotebooks } from "../redux/notebook";
import { thunkLoadEntries } from "../redux/entry";
import { thunkLoadUsers } from "../redux/users";
import { thunkLoadPosts } from "../redux/posts";
import { thunkGetCurrentUserActivities } from "../redux/activity";

const loadState = async (dispatch) => {
  await dispatch(thunkLoadUsers());
  await dispatch(thunkLoadNotebooks());
  await dispatch(thunkLoadEntries());
  await dispatch(thunkLoadPosts())
  await dispatch(thunkGetCurrentUserActivities());
};


export default loadState;
