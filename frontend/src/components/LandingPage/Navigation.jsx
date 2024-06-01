// import { NavLink } from "react-router-dom";
// import ProfileButton from "./ProfileButton";
import "./LandingPage.css";

import { useState, useEffect, useRef } from "react";
import OpenModalMenuItem from "../OpenModalButton/OpenModalMenuItem";
import LoginFormModal from "../Modals/LoginFormModal";
import SignupFormModal from "../Modals/SignupFormModal";

function Navigation() {
  const [showMenu, setShowMenu] = useState(false);
  // const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  // const toggleMenu = (e) => {
  //   e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
  //   setShowMenu(!showMenu);
  // };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  return (
    <div id='landingpage-navigation-container' >
        <img src='https://profile-images-pencrafted-capstone.s3.us-west-2.amazonaws.com/title-00366B.png' />
        <div id='landingpage-navigation-in-out-container'>
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
        </div>
    </div>

  );
}

export default Navigation;
