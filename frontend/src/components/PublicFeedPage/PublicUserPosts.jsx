import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsTrash3Fill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";

import OpenModalMenuItem from "../Modals/OpenModalButton/OpenModalMenuItem"
import EditPostFormModal from "../Modals/PostModals/EditPostModal";
import RemovePostModal from "../Modals/PostModals/RemovePostModal";
import LoadingPage from "../LoadingPage";


function PublicUserPosts () {
    const user = useSelector(state => state.session.user)
    const allEntries = useSelector(state => state.entries)
    const [entries, setEntries] = useState(Object.values(allEntries).filter(entry => entry.user_id === user.id && entry.is_public === true))
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (entry) setLoaded(true);
        else setLoaded(false);
    }, [loaded])

    useEffect(() => {
        setEntries(Object.values(allEntries).filter(entry => entry.user_id === user.id && entry.is_public === true))
    }, [allEntries, user])


    return (
        <div>
            {loaded ?
            <div>
                <p className='mini-page-title' ></p>
                <h1 id='homepage-user-title'>{`${user?.name}'s Posts`}</h1>
                <p className="page-title-blocks">Your Public Entries</p>
                <div id='homepage-notebook-card-container'>
                    {entries.map(entry => (
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
                    ))}
                </div>
            </div>
            : <LoadingPage /> }
        </div>
    )
}


export default PublicUserPosts;
