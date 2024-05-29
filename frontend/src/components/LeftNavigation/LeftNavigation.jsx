import { useDispatch, useSelector } from "react-redux";

import { thunkLogout } from "../../redux/session";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import './LeftNavigation.css'
import { useState } from "react";



function LeftNavigation() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const user = useSelector(state => state.session.user)
    const [openMain, setOpenMain] = useState('')
    const [openMid, setOpenMid] = useState('')

    const logout = (e) => {
        e.preventDefault();
        dispatch(thunkLogout());
        navigate('/')
    };

    const mainNavElementClick = (string) => {
        if (openMain) {
            setOpenMain('')
            setOpenMid('')
        } else {
            setOpenMain(string)
        }
    }

    const midNavElementClick = (string) => {
        if (openMid) {
            setOpenMid('')
        } else {
            setOpenMid(string)
        }
    }

    return (
        <div id='main-left-nav-container'>
            <div>
                <div id='left-nav-user-info' onClick={() => alert('Profile page and ability to change profile image coming soon')}>
                    {console.log(user)}
                    <div id='left-nav-user-info-inner'>
                        <img src={user?.profile_image} className="profile-image"/>
                        <div id='left-nav-user-name'>
                            <div>{`Hello ${user?.name}`}</div>
                            <div>{`username : ${user?.username}`}</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <div className='left-nav-main-ele' onClick={() => mainNavElementClick('home')}>Home</div>
                        <div hidden={openMain === 'home' ? false : true}>
                            <div className="left-nav-mid-line"></div>
                            <div className="left-nav-mid-ele" onClick={() => midNavElementClick('notebooks')}>Notebooks</div>
                            <div hidden={openMid === 'notebooks' ? false : true}>
                                <div className="left-nav-small-line"></div>
                                <div className="left-nav-small-ele">Currently no notebooks</div>
                            </div>
                            <div className="left-nav-mid-ele" onClick={() => alert('Feature coming soon')}>Theme</div>
                        </div>
                    </div>
                    <div>
                        <div className='left-nav-main-ele' onClick={() => alert('Tags coming soon')}>Tags</div>
                    </div>
                    <div>
                        <div className='left-nav-main-ele' onClick={() => alert('Public Feed coming soon')}>PublicFeed</div>
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
