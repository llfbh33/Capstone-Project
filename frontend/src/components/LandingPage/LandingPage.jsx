import Navigation from '../Navigation/Navigation'
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import { thunkLogin } from "../../redux/session";
import './LandingPage.css'
import { useNavigate } from 'react-router-dom';

function LandingPage() {
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [hidden, setHidden] = useState(true)
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch()
    const navigate = useNavigate();


    const handleClick = (e) => {
        e.preventDefault();

        if (username) {
            console.log('there is a username')
            setHidden(true)
        } else {
            setHidden(false)
        }
    }

    // logs in demo user
    const handledemologin = async (e) => {
        e.preventDefault();

        await dispatch(
            thunkLogin({
              username: 'demo',
              password: 'password',
            })
          );
        navigate('/home')
    }


    return (
        // <h1>Landing Page</h1>
        <div id='main-landingpage-container'>
            <Navigation />
            <div id='landingpage-section1-3-container' >
                <section id='landingpage-section-1'>
                    <img src='https://profile-images-pencrafted-capstone.s3.us-west-2.amazonaws.com/landing-page-title-image.png' />
                </section>
                <section id='landingpage-section-2'>
                    {/* <form id='landingpage-login-form' > */}
                        <input
                            type='text'
                            placeholder='User Name'
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                            >
                        </input>
                        <p className={hidden ? 'error-validation-hidden' : 'error-validation'}>Please enter your username before proceeding</p>
                        <OpenModalMenuItem
                        itemText="Continue"
                        onItemClick={handleClick}
                        modalComponent={<LoginFormModal username={username} />}
                        />
                    <button className='landingpage-demo-login-btn' onClick={handledemologin}>Login as Demo User</button>
                </section>
                <section id='landingpage-section-3'>

                </section>
            </div>

            <section id='landingpage-section-4'>
                <h2>Welcome to PenCrafted, where your creativity takes flight!</h2>
                <div>
                    At PenCrafted, we believe that every writer has a unique voice and story to tell.
                    Our platform is designed to provide you a safe space to express yourself!  Compose
                    your works privately or help you refine your craft through constructive feedback and
                    community support. Here’s how it works:
                </div>
                <ul>
                    <li>
                        Organize and create: Sign up and create notebooks centered on the topic you will
                        write about. Whether it’s a short story, poem, or novel excerpt, you can organize your
                        ideas within different entries and take note of important sections.
                    </li>
                    <li>
                        Get Constructive Criticism: Post your creations live to receive insightful feedback
                        from fellow writers and experienced reviewers. Our community thrives on mutual respect
                        and helpful critiques, ensuring that every piece gets the attention it deserves.
                    </li>
                    <li>
                        Support Others: Read and critique the works of other members. Offering feedback not only
                        helps others but also sharpens your own critical eye and writing skills
                    </li>
                </ul>
            </section>
            <footer id='landingpage-footer' >
                <div id='landingpage-footer-subsection'>
                    <Link to='https://github.com/llfbh33/Capstone-Project' className='landingpage-footer-link'>About</Link>
                    <Link className='landingpage-footer-link' onClick={() => alert('Linked in coming soon')}>Contact Us</Link>
                </div>
                <div>
                    PenCrafted by Aubrie Woodbine
                </div>
            </footer>
        </div>
    )
}


export default LandingPage
