import { thunkLoadNotebooks } from "../redux/notebook";

const loadState = async (dispatch) => {
  await dispatch(thunkLoadNotebooks());
  return
};

export default loadState;
