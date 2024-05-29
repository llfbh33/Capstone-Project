import { useDispatch } from "react-redux";

import { thunkLogout } from "../../redux/session";
import { useNavigate } from "react-router-dom";

import './LeftNavigation.css'



function LeftNavigation() {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const logout = (e) => {
        e.preventDefault();
        dispatch(thunkLogout());
        navigate('/')
    };



    return (
        <div id='main-left-nav-container'>left navBar main div
            <div>
                signout section (bottom)
                <button onClick={logout}>Log Out</button>
            </div>
        </div>
    )
}


export default LeftNavigation
