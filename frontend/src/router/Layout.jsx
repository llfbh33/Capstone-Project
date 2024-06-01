import { useEffect} from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
import LeftNavigation from "../components/LeftNavigation/LeftNavigation";
import loadState from "../utils/loadData";


export default function Layout() {
  const dispatch = useDispatch();

  // authenticating user then loading the state of the site
  useEffect(() => {
    dispatch(thunkAuthenticate())
    .then(() => loadState(dispatch))
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
                   <Outlet />
              </div>
          </div>
          <Modal />
          </ModalProvider>
      </>
  );
}
