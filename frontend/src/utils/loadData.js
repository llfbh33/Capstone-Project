import { thunkLoadNotebooks } from "../redux/notebook";
import { thunkLoadEntries } from "../redux/entry";

const loadState = async (dispatch) => {
  await dispatch(thunkLoadNotebooks());
  await dispatch(thunkLoadEntries());
};

export default loadState;
