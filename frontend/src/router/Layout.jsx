import { useEffect, useState} from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
import LeftNavigation from "../components/LeftNavigation/LeftNavigation";
import loadState from "../utils/loadData";
import { thunkLoadUsers } from "../redux/users";
import LoadingPage from "../components/LoadingPage/LoadingPage";


export default function Layout() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true)

  // authenticating user then loading the state of the site
  useEffect(() => {
    dispatch(thunkAuthenticate())
    .then(() => loadState(dispatch))
    .then(() => setLoading(false))
    .catch((error) => console.log(error))
  }, [dispatch]);

  return (
      <>
          <ModalProvider>
          <div className='main-insite-container'>
              <div className='left-hand-nav-container'>
                    <LeftNavigation />
              </div>
              <div className='main-insite-content-container'>
                   {loading? <LoadingPage /> : <Outlet />}
              </div>
          </div>
          <Modal />
          </ModalProvider>
      </>
  );
}
