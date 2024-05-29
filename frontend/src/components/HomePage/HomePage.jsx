import { useSelector } from "react-redux";
import LeftNavigation from "../LeftNavigation/LeftNavigation";
import './HomePage.css'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function HomePage () {
    const user = useSelector(state => state.session.user)
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) navigate('/')
    }, [user])


    return (
        <div id='main-homepage-container'>
            <div id='left-hand-nav-container'>
                <LeftNavigation />
            </div>
            <div id='main-homepage-content-container'>
                <h1>Home Page</h1>
                <h2>Insert left side nav bar and notebooks</h2>
                <h3> and a signout on that nav bar</h3>
                <h1>Home Page</h1>
                <h2>Insert left side nav bar and notebooks</h2>
                <h3> and a signout on that nav bar</h3>
                <h1>Home Page</h1>
                <h2>Insert left side nav bar and notebooks</h2>
                <h3> and a signout on that nav bar</h3>
                <h1>Home Page</h1>
                <h2>Insert left side nav bar and notebooks</h2>
                <h3> and a signout on that nav bar</h3>
                <h1>Home Page</h1>
                <h2>Insert left side nav bar and notebooks</h2>
                <h3> and a signout on that nav bar</h3>
                <h1>Home Page</h1>
                <h2>Insert left side nav bar and notebooks</h2>
                <h3> and a signout on that nav bar</h3>
                <h1>Home Page</h1>
                <h2>Insert left side nav bar and notebooks</h2>
                <h3> and a signout on that nav bar</h3>
                <h1>Home Page</h1>
                <h2>Insert left side nav bar and notebooks</h2>
                <h3> and a signout on that nav bar</h3>
                <h1>Home Page</h1>
                <h2>Insert left side nav bar and notebooks</h2>
                <h3> and a signout on that nav bar</h3>
                <h1>Home Page</h1>
                <h2>Insert left side nav bar and notebooks</h2>
                <h3> and a signout on that nav bar</h3>
                <h1>Home Page</h1>
                <h2>Insert left side nav bar and notebooks</h2>
                <h3> and a signout on that nav bar</h3>
            </div>
        </div>
    )
}


export default HomePage;
