
import "./LeftNavigation.css";


const NavLinks = ({ navObj, activeNav, handleClick }) => {

    return (
        <div>
            <div
                className={ `nav-tab ${navObj.name === activeNav ? "nav-tab-selected" : ""}`}
                onClick={() => handleClick(navObj)}
            >
                { navObj.title }
            </div>
            <div className={ navObj.name === activeNav ? "divider-line" : "" }></div>
        </div>
    )
}

export default NavLinks