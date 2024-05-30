import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
import { thunkLoadNotebooks } from "../redux/notebook";
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
    // .then(() => console.log('hello'))
    .then(() => dispatch(thunkLoadNotebooks()))
    .then(() => setIsLoaded(true))
    .catch((error) => console.log(error))
  }, [dispatch]);

  return (
    <>
      <ModalProvider>
        {isLoaded && <Outlet />}
        <Modal />
      </ModalProvider>
    </>
  );
}
