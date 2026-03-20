import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa6";
import { CiLinkedin } from "react-icons/ci";
import { useAppTheme } from "../../context/Theme/ThemeContext";
import { useNav } from "../../context/Navigation/NavigationContext";
import OpenModalMenuItem from "../Modals/OpenModalButton/OpenModalMenuItem";
import ProfileModal from "../Modals/ProfileModal/ProfileModal";

import { thunkLogout } from "../../redux/session";
import './LeftNavigation.css'


function LeftNavigation() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const user = useSelector(state => state.session.user)
    const notebooks = useSelector(state => state.notebooks)
    const [openMain, setOpenMain] = useState('')
    const [openMid, setOpenMid] = useState('')
    const [openSml, setOpenSml] = useState('')
    // State the small screen based on the current window width
    const [mediaQuery, setMediaQuery] = useState(window.innerWidth < 950);
    const [navVisible, setNavVisible] = useState(!mediaQuery)
    const { theme, setTheme } = useAppTheme();
    const { activeNav, setActiveNav } = useNav();


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



    const sidePanelClick = (level, change) => {
        if (level === 'main') {
            const newState = {
                main: change,
                mid: { title: null, route: null, open: false },
                small: { title: null, route: null, open: false },
            };
            setActiveNav(newState);
            navigate(change.route);
            return;
        } else if (level === 'mid') {
            const newState = {
                main: {...activeNav.main},
                mid: change,
                small: { title: null, route: null, open: false },
            };
            setActiveNav(newState);
            navigate(change.route);
        }
        // if (change === 'home') {
        //     const newState = {
        //         main: { title: 'home', route: '/', open: !activeNav.main.open },
        //         mid: { title: 'notebooks', route: '/', open: false },
        //         small: { title: null, id: null, route: null, open: false },
        //     }
        //     setActiveNav(newState);
        // } else
        if (change === 'notebooks') {
            const newState = {
                main: { title: 'home', route: '/', open: true },
                mid: { title: 'notebooks', route: '/', open: !activeNav.mid.open },
                small: { title: null, id: null, route: null, open: false },
            }
            setActiveNav(newState);
        }

        if (level === 'small') {
            setActiveNav((prev) => ({
                ...prev,
                small: change,
            }))
            navigate(change.route)
        }
    }

    // Open and close of main navigation tabs
    const mainNavElementClick = (string) => {
        console.log(string)
        if (openMain !== string) {
            setOpenMain(string)
        } else if (openMain === string) {
            setOpenMain('')
        } else {
            setOpenMain(string)
        }
        if (string === '/comments') {
            navigate('/comments')
        }
        if (string === '/public') {
            navigate('/public')
        }
    };


    //Open and close of mid and size tabs / navigates
    const midNavElementClick = (string) => {
        if (openMid === string) {
            setOpenMid('')
        } else {
            setOpenMid(string)
            setOpenSml('')

            if (string === 'notebooks') {
                navigate('/')
            } else if (string === 'all-posts') {
                navigate('/public')
            } else if (string === 'user-posts') {
                navigate('/public/user')
            }
        }
    };


    // Navigating to a specific notebook by id
    const handleClickNotebook = (id) => {
        setOpenSml(id)
        navigate(`/notebook/${id}`)
    }

    // Loging out of the site
    const logout = async (e) => {
        e.preventDefault();
        await dispatch(thunkLogout());
        navigate('/')
    };


    return (
        <div id='main-left-nav-container'>
            <div className="adjust-for-media-query">
                <div id='left-nav-user-info'>
                    <div id='left-nav-user-info-inner'>
                        <div>
                            <OpenModalMenuItem 
                                itemText={<img src={user?.profile_image} className="profile-image nav-profile-image" />}
                                modalComponent={<ProfileModal />}
                            />
                        </div>
                        <div id='left-nav-user-name'>
                            <div>{`Hello ${user?.name}`}</div>
                            <div>{user?.username}</div>
                        </div>
                        <div className='media-query-menu' onClick={() => setNavVisible(!navVisible)}>Menu</div>
                    </div>
                </div>
                <div id="navigation-container" style={{ display: navVisible ? 'block' : 'none' }}>
                    
                    <div>
                        <div
                            className={activeNav.main.title === 'home' ? "left-nav-main-ele-selected" : "left-nav-main-ele"}
                            onClick={() => sidePanelClick(
                                'main', 
                                { title: 'home', route: '/', open: false }
                            )}
                        >
                            Home
                        </div>
                        <div className={activeNav.main.title === 'home' ? "left-nav-mid-line" : ""}></div>
                    </div>

                    <div>
                        <div
                            className={activeNav.main.title === 'notebooks' ? "left-nav-main-ele-selected" : "left-nav-main-ele"}
                            onClick={() => sidePanelClick(
                                'main', 
                                {title: 'notebooks', route: '/notebooks', open: activeNav.main.title === 'notebooks' ? !activeNav.main.open : true}
                            )}
                        >
                            Notebooks
                        </div>
                        <div className={activeNav.main.title === 'notebooks' ? "left-nav-mid-line" : ""}></div>
                    </div>
                        
                    <div>
                        <div 
                            className={activeNav.main.title === 'publicFeed' ? "left-nav-main-ele-selected" : "left-nav-main-ele"} 
                            onClick={() => sidePanelClick(
                                'main', 
                                {title: 'publicFeed', route: '/public', open: activeNav.main.title === 'publicFeed' ? !activeNav.main.open : true}
                                )}
                        >
                            Public Feed
                        </div>
                        <div className={activeNav.main.title === 'publicFeed' ? "left-nav-mid-line" : ""}></div>
                    </div>

                    <div>
                        <div 
                            className={activeNav.main.title === 'comments' ? "left-nav-main-ele-selected" : "left-nav-main-ele"} 
                            onClick={() => sidePanelClick(
                                'main', 
                                {title: 'comments', route: '/comments', open: activeNav.main.title === 'comments' ? !activeNav.main.open : true}
                                )}
                        >
                            Comments
                        </div>
                        <div className={activeNav.main.title === 'comments' ? "left-nav-mid-line" : ""}></div>
                    </div>

                    {/* {/* <div>
                        <div className='left-nav-main-ele' onClick={() => alert('Following coming soon')}>Following</div>
                    </div> */}

                    <div>
                        <div className={openMain === '/dev-links' ? "left-nav-main-ele-selected" : "left-nav-main-ele"} onClick={() => mainNavElementClick('/dev-links')}>Dev Links</div>
                        <div className="left-nav-mid-line" hidden={openMain !== '/dev-links'} ></div>
                        <div hidden={openMain === '/dev-links' ? false : true} className="developer-link-container">
                            <Link to='https://github.com/llfbh33' className='developer-links' target='_blank'><FaGithub /></Link>
                            <Link to='https://www.linkedin.com/in/aubriewoodbine/' className='developer-links' target='_blank'><CiLinkedin /></Link>
                        </div>
                    </div>
                    <div className="signout-on-media-query">
                        <div id='left-nav-signout' onClick={logout}>{`Sign out ${user?.username}`}</div>
                    </div>

                </div>
            </div>
            <div id="left-nav-signout-container">
                <div id='left-nav-signout' onClick={logout}>{`Sign out ${user?.username}`}</div>
            </div>

        </div>
    )
}


export default LeftNavigation
