import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
import { thunkLoadNotebooks } from "../redux/notebook";
import LeftNavigation from "../components/LeftNavigation/LeftNavigation";
import HomePage from "../components/HomePage/HomePage";
// import loadState from "../utils/loadData";
// import LandingPage from "../components/LandingPage/LandingPage";
// import Navigation from "../components/Navigation/Navigation";
// import TestImageForm from '../components/TestImageForm/TestImageForm'
// import LandingPage from "../components/LandingPage/LandingPage";

export default function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(thunkAuthenticate())
    .then(() => dispatch(thunkLoadNotebooks()))
    .then(() => dispatch(thunkLoadNotebooks()))
    .then(() => setIsLoaded(true))
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
          {/* {isLoaded && <Outlet />} */}
          <Modal />
          </ModalProvider>
      </>
  );
}
