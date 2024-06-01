import { useDispatch, useSelector } from "react-redux";

import { thunkLogout } from "../../redux/session";
import { useNavigate, NavLink } from "react-router-dom";

import './LeftNavigation.css'
import { useState } from "react";
import { thunkLoadEntries } from "../../redux/entry";


function LeftNavigation() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const user = useSelector(state => state.session.user)
    const notebooks = useSelector(state => state.notebooks)
    const [openMain, setOpenMain] = useState('')
    const [openMid, setOpenMid] = useState('')

    const logout = (e) => {
        e.preventDefault();
        dispatch(thunkLogout());
    };

    const mainNavElementClick = (string) => {
        if (openMain !== string) {
            setOpenMain('')
            setOpenMid('')
            setOpenMain(string)
            navigate(string)
        } else if (openMain === string){
            setOpenMain('')
            setOpenMid('')
        } else {
            setOpenMain(string)
            navigate(string)
        }
    }

    const midNavElementClick = (string) => {
        if (openMid) {
            setOpenMid('')
        } else {
            setOpenMid(string)
        }
    }

    const handleClickNotebook = (id) => {
        navigate(`/notebook/${id}`)
    }

    const publicFeed = async () => {
        await dispatch(thunkLoadEntries())
        navigate('/public')
    }

    return (
        <div id='main-left-nav-container'>
            <div>
                <div id='left-nav-user-info' onClick={() => alert('Profile page and ability to change profile image coming soon')}>
                    <div id='left-nav-user-info-inner'>
                        <img src={user?.profile_image} className="profile-image"/>
                        <div id='left-nav-user-name'>
                            <div>{`Hello ${user?.name}`}</div>
                            <div>{user?.username}</div>
                        </div>
                    </div>
                </div>
                <div id="navigation-container">
                    <div>
                    <div className={openMain === '/' ? "left-nav-main-ele-selected" : "left-nav-main-ele"} onClick={() => mainNavElementClick('/')}>Home</div>
                        <div hidden={openMain === '/' ? false : true}>
                            <div className="left-nav-mid-line"></div>
                            <div className={openMid === 'notebooks' ? "left-nav-mid-ele-selected" : "left-nav-mid-ele"} onClick={() => midNavElementClick('notebooks')}>Notebooks</div>
                            <div hidden={openMid === 'notebooks' ? false : true}>
                                <div className="left-nav-small-line"></div>
                                <div className="left-nav-small-ele">
                                    {notebooks
                                        ? Object.values(notebooks).map(notebook => (
                                            <div className="left-nav-notebook-name" key={notebook?.id} onClick={() => handleClickNotebook(notebook.id)}>
                                                <div>{notebook?.name}</div>
                                            </div>

                                            ))
                                    : ''}
                                </div>
                            </div>
                            <div className="left-nav-mid-ele" onClick={() => alert('Feature coming soon')}>Theme</div>
                        </div>
                    </div>
                    <div>
                        <div className='left-nav-main-ele' onClick={() => alert('Tags coming soon')}>Tags</div>
                    </div>
                    <div>
                    <div className={openMain === '/public' ? "left-nav-main-ele-selected" : "left-nav-main-ele"} onClick={() => mainNavElementClick('/public')}>Public Feed</div>
                        <div hidden={openMain === '/public' ? false : true}>
                        <div className="left-nav-mid-line"></div>
                            <div className="left-nav-mid-ele" onClick={publicFeed}>All Posts</div>
                        </div>
                    </div>
                    <div>
                        <div className='left-nav-main-ele' onClick={() => alert('Comments coming soon')}>Comments</div>
                    </div>
                    <div>
                        <div className='left-nav-main-ele' onClick={() => alert('Following coming soon')}>Following</div>
                    </div>
                    <div>
                        <div className='left-nav-main-ele' onClick={() => alert('Liked Posts coming soon')}>LikedPosts</div>
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
