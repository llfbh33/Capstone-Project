import { useSelector } from "react-redux";
import LeftNavigation from "../LeftNavigation/LeftNavigation";
import './HomePage.css'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function HomePage () {
    const user = useSelector(state => state.session.user)
    const notebooks = useSelector(state => state.notebooks)
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) navigate('/')
    }, [user])

    const handleClickNotebook = (id) => {
        // alert(`feature will send user to notebook ${id} page`)
        navigate(`/notebook/${id}`)
    }

    const handleNewNotebook = () => {
        alert(`create new notebook here`)
    }

    return (
        <div className='main-insite-container'>
            <div className='left-hand-nav-container'>
                <LeftNavigation />
            </div>
            <div className='main-insite-content-container'>
                <p className='mini-page-title' >Ready to write? Create a notebook to get started!</p>
                <h1 id='homepage-user-title'>{`${user?.name}'s Home`}</h1>
                <p className="page-title-blocks">Your Notebooks</p>
                <div id='homepage-notebook-card-container'>
                    {notebooks
                        ? Object.values(notebooks).map(notebook => (
                            <div className="homepage-notebook-card" key={notebook.id} onClick={() => handleClickNotebook(notebook.id)}>
                                <div>{notebook.name}</div>
                            </div>

                            ))
                    : ''}
                    <div id='homepage-new-notebook-card' onClick={handleNewNotebook} >
                        <div id='create-notebook-title' >
                            Click here to create a new Notebook
                        </div>
                    </div>
                </div>
                <h1 id='homepage-underline'></h1>
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
