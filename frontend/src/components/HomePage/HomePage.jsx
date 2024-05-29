import LeftNavigation from "../LeftNavigation/LeftNavigation";
import './HomePage.css'

function HomePage () {
    return (
        <div id='main-homepage-container'>
            <div id='left-hand-nav-container'>
                <LeftNavigation />
            </div>
            <div>
                <h1>Home Page</h1>
                <h2>Insert left side nav bar and notebooks</h2>
                <h3> and a signout on that nav bar</h3>
            </div>
        </div>
    )
}


export default HomePage;
