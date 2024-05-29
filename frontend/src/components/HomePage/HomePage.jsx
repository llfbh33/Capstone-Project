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
                <p className='mini-page-title' >Ready to write? Create a notebook to get started!</p>
                <h1 id='homepage-user-title'>{`${user?.name}'s Home`}</h1>
                <p className="page-title-blocks">Notebooks</p>
                <div>
                    <div>This is were we will map all of our Notebooks</div>
                </div>
                <h1 id='homepage-user-title'></h1>
                <p className="page-title-blocks">Your Public Entries</p>
                <div>
                    <div>
                        This is where we will map all of our public entries
                    </div>
                </div>
            </div>
        </div>
    )
}


export default HomePage;
