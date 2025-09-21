import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsTrash3Fill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";

import OpenModalMenuItem from "../Modals/OpenModalButton/OpenModalMenuItem"
import EditPostFormModal from "../Modals/PostModals/EditPostModal";
import RemovePostModal from "../Modals/PostModals/RemovePostModal";
import LoadingPage from "../LoadingPage/LoadingPage";



function PublicUserPosts () {
    const user = useSelector(state => state.session.user)
    const allEntries = useSelector(state => state.entries)
    const [entries, setEntries] = useState(Object.values(allEntries).filter(entry => entry.user_id === user.id && entry.is_public === true))
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (entries) setLoaded(true);
        else setLoaded(false);
    }, [entries])

    useEffect(() => {
        setEntries(Object.values(allEntries).filter(entry => entry.user_id === user.id && entry.is_public === true))
    }, [allEntries, user])

    if (!loaded) {
        return <LoadingPage />
    }

    return (
        <div className="main-container">
            {loaded ?
            <div className="users-posts-container">
                <h1 className='title page-title'>{`${user?.name}'s Posts`}</h1>
                <p className="title page-subtitle">Your Public Entries</p>
                <div id='homepage-notebook-card-container'>
                    {entries.length ? entries.map(entry => (
                        <div key={entry?.id}>
                            <div className="homepage-notebook-card"  >

                                <div className="homepage-notebook-card-details" onClick={() => navigate(`/public/${entry?.id}`)}>
                                    <div>
                                        <div>{entry?.name}</div>
                                    </div>
                                    <div className='notebook-about-section-container'>
                                        <div>{`${entry?.post.message}`}</div>
                                    </div>
                                </div>

                                <div className="notebook-edit-delete-container">
                                    <div className="homepage-edit-notebook">
                                        <OpenModalMenuItem
                                        itemText={<FaEdit />}
                                        modalComponent={<EditPostFormModal post={entry} />}
                                        />
                                    </div>
                                    <div className="homepage-edit-notebook">
                                        <OpenModalMenuItem
                                        itemText={<BsTrash3Fill />}
                                        modalComponent={<RemovePostModal post={entry} />}
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))
                : <div className="no-public-posts">You have not made any public posts yet.</div>}
                </div>
            </div>
            : <LoadingPage /> }
        </div>
    )
}


export default PublicUserPosts;
