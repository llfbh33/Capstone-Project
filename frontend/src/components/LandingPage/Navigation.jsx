
import "./LandingPage.css";

import LoginFormModal from "../Modals/LoginFormModal";
import SignupFormModal from "../Modals/SignupFormModal";
import OpenModalMenuItem from "../Modals/OpenModalButton/OpenModalButton"
import { useAppTheme } from "../../context/Theme/ThemeContext";

function Navigation() {
  const { theme, setTheme } = useAppTheme();

  const appImage = {
    light: 'https://profile-images-pencrafted-capstone.s3.us-west-2.amazonaws.com/nav-title-00366B-light.png',
    dark: 'https://profile-images-pencrafted-capstone.s3.us-west-2.amazonaws.com/nav-title-00366B.png',
  }

  return (
    <div id='landingpage-navigation-container' >
        <img src={theme === 'dark' ? appImage.dark : appImage.light} />
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
