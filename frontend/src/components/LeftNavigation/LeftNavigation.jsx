import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

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

// Open and close of main navigation tabs
    const mainNavElementClick = (string) => {
        if (openMain !== string) {
            setOpenMain(string)
        } else if (openMain === string){
            setOpenMain('')
        } else {
            setOpenMain(string)
        }
        if (string === '/comments') {
            navigate('/comments')
        }
    };


//Open and close of mid and size tabs / navigates
    const midNavElementClick = (string) => {
        setOpenMid(string)
        setOpenSml('')
        if (string === 'notebooks'){
            navigate('/')
        } else if (string === 'all-posts') {
            navigate('/public')
        } else if (string === 'user-posts') {
            navigate('/public/user')
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
                        <img src={user?.profile_image} className="profile-image nav-profile-image"/>
                        <div id='left-nav-user-name'>
                            <div>{`Hello ${user?.name}`}</div>
                            <div>{user?.username}</div>
                        </div>
                        <div className='media-query-menu' onClick={() => setNavVisible(!navVisible)}>Menu</div>
                    </div>
                </div>
                <div id="navigation-container" style={{ display: navVisible ? 'block' : 'none' }}>
                    {/* <div> */}
                        <div className={openMain === '/' ? "left-nav-main-ele-selected" : "left-nav-main-ele"} onClick={() => mainNavElementClick('/')}>Home</div>

                        <div hidden={openMain === '/' ? false : true}>
                            <div className={openMid === 'notebooks' ? "left-nav-mid-ele-selected" : "left-nav-mid-ele"} onClick={() => midNavElementClick('notebooks')}>Notebooks</div>
                            <div hidden={openMid === 'notebooks' ? false : true}>
                                <div className="left-nav-small-line"></div>
                                <div className="left-nav-small-ele">
                                    {notebooks
                                        ? Object.values(notebooks).map(notebook => (
                                            <div className={openSml === notebook.id ? "left-nav-sml-ele-selected" : "left-nav-sml-ele"} key={notebook?.id} onClick={() => handleClickNotebook(notebook.id)}>
                                                <div>{notebook?.name}</div>
                                            </div>
                                            ))
                                    : ''}
                                </div>
                            </div>
                            <div className={openMid === 'theme' ? "left-nav-mid-ele-selected" : "left-nav-mid-ele"} onClick={() => midNavElementClick('theme')}>Theme</div>
                            <div hidden={openMid === 'theme' ? false : true}>
                                <div className="left-nav-small-line"></div>
                                <div className="left-nav-small-ele">
                                    <div className="left-nav-sml-ele-selected">PenCrafted (default)</div>
                                </div>
                            </div>
                        </div>
                    {/* </div> */}

                    {/* <div>
                        <div className='left-nav-main-ele' onClick={() => alert('Tags coming soon')}>Tags</div>
                    </div> */}

                    <div>
                        <div className={openMain === '/public' ? "left-nav-main-ele-selected" : "left-nav-main-ele"} onClick={() => mainNavElementClick('/public')}>Public Feed</div>
                            <div hidden={openMain === '/public' ? false : true}>
                                <div className="left-nav-mid-line"></div>
                                <div className={openMid === 'all-posts' ? "left-nav-mid-ele-selected" : "left-nav-mid-ele"} onClick={() => midNavElementClick('all-posts')}>All Posts</div>
                                <div className={openMid === 'user-posts' ? "left-nav-mid-ele-selected" : "left-nav-mid-ele"} onClick={() => midNavElementClick('user-posts')}>Your Posts</div>
                            </div>
                        </div>

                        <div>
                            <div className={openMain === '/comments' ? "left-nav-main-ele-selected" : "left-nav-main-ele"} onClick={() => mainNavElementClick('/comments')}>Comments</div>
                        </div>

                    {/* <div>
                        <div className='left-nav-main-ele' onClick={() => alert('Following coming soon')}>Following</div>
                    </div>

                    <div>
                        <div className='left-nav-main-ele' onClick={() => alert('Liked Posts coming soon')}>LikedPosts</div>
                    </div> */}
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
