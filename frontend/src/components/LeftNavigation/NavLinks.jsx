
import "./LeftNavigation.css";


const NavLinks = ({ navObj, activeNav, handleClick }) => {

    return (
        <div>
            <div
                className={ navObj.name === activeNav ? "left-nav-main-ele-selected" : "left-nav-main-ele"}
                onClick={() => handleClick(navObj)}
            >
                { navObj.title }
            </div>
            <div className={ navObj.name === activeNav ? "left-nav-mid-line" : "" }></div>
        </div>
    )
}

export default NavLinks