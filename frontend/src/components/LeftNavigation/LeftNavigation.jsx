import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import OpenModalMenuItem from "../Modals/OpenModalButton/OpenModalMenuItem";
import ProfileModal from "../Modals/ProfileModal/ProfileModal";
import { useNav } from "../../context/Navigation/NavigationContext";
import { thunkLogout } from "../../redux/session";
import './LeftNavigation.css'
import DevLinks from "./DevLinks";
import NavLinks from "./NavLinks";


const navigationLinks = [
    {
        name: "home",
        title: "Home",
        route: "/"
    },
    {
        name: "notebooks",
        title: "Notebooks",
        route: "/notebooks",
    },
    {
        name: "allEntries",
        title: "All Entries",
        route: "/all_entries",
    },
    {
        name: "public",
        title: "Public Feed",
        route: "/public"
    },
    {
        name: "comments",
        title: "Comments",
        route: "/comments",
    },
]



function LeftNavigation() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const user = useSelector(state => state.session.user)
    const [mediaQuery, setMediaQuery] = useState(window.innerWidth < 950);
    const [navVisible, setNavVisible] = useState(!mediaQuery)
    const { activeNav, setActiveNav } = useNav();
    const [devLinks, setDevLinks] = useState(false);


    // Determins the screen size and sets state accordingly
    useEffect(() => {
        // setting a watch on if the minimum width is 950px
        const mediaQueryLarge = window.matchMedia('(min-width: 950px)');

        // set a boolean, true: if screen is 950 or less, false if screen is 950 or more
        // closes dropdown if smaller than 950
        const makeNavTabsInvisible = (e) => {
            setMediaQuery(!e.matches);
            setNavVisible(e.matches);
        };

        // Initial check
        makeNavTabsInvisible(mediaQueryLarge);

        // Add event listener
        mediaQueryLarge.addEventListener('change', makeNavTabsInvisible);

        // removes the listener if the width
        return () => {
            mediaQueryLarge.removeEventListener('change', makeNavTabsInvisible);
        };
    }, [])


    // Updates for navigation click
    const handleClick = (navObj) => {
        setActiveNav(navObj.name);
        navigate(navObj.route);
    };



    // Logs out of app
    const logout = async (e) => {
        e.preventDefault();
        await dispatch(thunkLogout());
        navigate('/')
    };


    return (
        <div className='left-hand-nav-container' id="left_app_navigation">
            <div id='main-nav-container'>
                <div style={{ flex: 1 }}>

                    {/* Navigation Header */}
                    <div id='nav-user-info'>
                        <div id='nav-user-info-inner'>
                            <div>
                                <OpenModalMenuItem
                                    itemText={<img src={user?.profile_image} className="profile-image" />}
                                    modalComponent={<ProfileModal />}
                                />
                            </div>
                            <div id='nav-user-name'>
                                <div>{`Hello ${user?.name}`}</div>
                                <div>{user?.username}</div>
                            </div>
                            {mediaQuery &&
                                <div
                                    className='media-query-menu'
                                    onClick={() => setNavVisible(!navVisible)}
                                >
                                    Menu
                                </div>
                            }
                        </div>
                    </div>

                    {/* When the nav dropdown is visible set the display to flex, populate nav links */}
                    <div id="navigation-container" style={{ display: navVisible ? 'flex' : 'none' }}>
                        {navigationLinks.map(link => (
                            <NavLinks key={link.name} navObj={link} activeNav={activeNav} handleClick={handleClick} />
                        ))}


                        {/* Dev links and signout only visible on screens smaller than 950px */}
                        {mediaQuery &&
                            <div>
                                <div className={devLinks ? "dev-container-sm" : "dev-title-container"}>
                                    <div className={`nav-tab ${devLinks ? "nav-tab-selected" : ""}`} onClick={() => setDevLinks(prev => !prev)}>
                                        Dev Links
                                    </div>
                                    {devLinks && mediaQuery &&
                                        <DevLinks />
                                    }
                                </div>
                                <div className='nav-tab' onClick={logout}>{`Sign out ${user?.username}`}</div>
                            </div>
                        }

                    </div>
                </div>

                {/* Dev links and signout only visible on screens larger than 950px */}
                {!mediaQuery &&
                    <div className="nav-signout-container">
                        <DevLinks />
                        <div id='nav-signout' onClick={logout}>{`Sign out ${user?.username}`}</div>
                    </div>
                }
            </div>
        </div>
    )
}


export default LeftNavigation
