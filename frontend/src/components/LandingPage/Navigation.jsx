
import "./LandingPage.css";

import LoginFormModal from "../Modals/LoginFormModal";
import SignupFormModal from "../Modals/SignupFormModal";
import OpenModalMenuItem from "../Modals/OpenModalButton/OpenModalButton"

function Navigation() {

  return (
    <div id='landingpage-navigation-container' >
        <img src='https://profile-images-pencrafted-capstone.s3.us-west-2.amazonaws.com/nav-title-00366B.png' />
        <div id='landingpage-navigation-in-out-container'>
            <OpenModalMenuItem
              buttonText="Log In"
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              buttonText="Sign Up"
              modalComponent={<SignupFormModal />}
            />
        </div>
    </div>

  );
}

export default Navigation;
