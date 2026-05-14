import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa6";
import { CiLinkedin } from "react-icons/ci";
import { FaRegFolderOpen } from "react-icons/fa6";
import { FaFilePdf } from "react-icons/fa6";
import './LeftNavigation.css';


// One location for dev links so updates are uniform
const DevLinks = () => {

    return (
        <div className="dev-link-container">
            <Link to='https://github.com/llfbh33' className='developer-link' target='_blank'><FaGithub /></Link>
            <Link to='https://www.linkedin.com/in/aubriewoodbine/' className='developer-link' target='_blank'><CiLinkedin /></Link>
            <Link to='/Aubrie-Resume.pdf' className='developer-link' target='_blank'><FaFilePdf /></Link>
            <Link to='https://aubries-portfolio.vercel.app/' className='developer-link' target='_blank'><FaRegFolderOpen /></Link>
        </div>
    )
}

export default DevLinks;