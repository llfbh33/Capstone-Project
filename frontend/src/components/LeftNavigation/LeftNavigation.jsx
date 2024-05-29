import { useDispatch } from "react-redux";

import { thunkLogout } from "../../redux/session";
import { useNavigate } from "react-router-dom";



function LeftNavigation() {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const logout = (e) => {
        e.preventDefault();
        dispatch(thunkLogout());
        navigate('/')
    };



    return (
        <div>left navBar main div
            <div>
                signout section (bottom)
                <button onClick={logout}>Log Out</button>
            </div>
        </div>
    )
}


export default LeftNavigation
