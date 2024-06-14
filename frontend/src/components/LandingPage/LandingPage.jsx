import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import OpenModalMenuItem from "../Modals/OpenModalButton/OpenModalButton"
import LoginFormModal from "../Modals/LoginFormModal";
import Navigation from './Navigation'
import { thunkLogin } from "../../redux/session";
import { ModalProvider, Modal } from "../../context/Modal";

import './LandingPage.css'

function LandingPage() {
    const dispatch = useDispatch();

    const handledemologin = async (e) => {
        e.preventDefault();

        await dispatch(
            thunkLogin({
              username: 'demo-user',
              password: 'password',
            })
        )
    }

    return (
        <div>
            <ModalProvider>
            <div id='main-landingpage-container'>
                <Navigation />

                <div id='landingpage-section1-3-container' >
                    <section id='landingpage-section-1'>
                        <img src='https://profile-images-pencrafted-capstone.s3.us-west-2.amazonaws.com/landing-page-title-image.png' />
                        <div className='landingpage-section-1-midtitle'>Your Writing Journey Starts Here: Create, Share, Improve! Sign in now!</div>
                    </section>
                    <section id='landingpage-section-2'>
                        <OpenModalMenuItem
                        buttonText="Continue"
                        modalComponent={<LoginFormModal />}
                        />
                        <button className='button landingpage-demo-login-btn' onClick={handledemologin}>Login as Demo User</button>
                    </section>
                    <section id='landingpage-section-3'>

                    </section>
                </div>

                <section id='landingpage-section-4'>
                    <h2 id='landingpage-section4-title' >Welcome to PenCrafted, where your creativity takes flight!</h2>
                    <div id='landingpage-section4-minititle'>
                        At PenCrafted, we believe that every writer has a unique voice and story to tell.
                        Our platform is designed to provide you a safe space to express yourself!  Compose
                        your works privately or help you refine your craft through constructive feedback and
                        community support. Here’s how it works:
                    </div>
                    <ul id='landingpage-minititle-list-container'>
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
                        <Link to='https://github.com/llfbh33' className='landingpage-footer-link' target='_blank'>Github</Link>
                        <Link className='landingpage-footer-link' onClick={() => alert("Aubrie Woodbine's LinkedIn is coming soon!")}>Contact Us</Link>
                    </div>
                    <div id='landingpage-footer-subsection'>
                        PenCrafted by Aubrie Woodbine
                    </div>
                </footer>
            </div>
            <Modal />
            </ModalProvider>
        </div>
    )
}


export default LandingPage
