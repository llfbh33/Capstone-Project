import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsTrash3Fill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";

import OpenModalMenuItem from "../Modals/OpenModalButton/OpenModalMenuItem"
import EditPostFormModal from "../Modals/PostModals/EditPostModal";
import RemovePostModal from "../Modals/PostModals/RemovePostModal";
import './CommentsPage.css'


function CommentsPage () {
    const user = useSelector(state => state.session.user)
    const allEntries = useSelector(state => state.entries)
    const [userEntries, setUserEntries] = useState(Object.values(allEntries).filter(entry => entry.user_id === user.id && entry.is_public === true && entry.comments.length >= 1));
    const [commentEntries, setCommentEntries] = useState('');
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (userEntries) setLoaded(true);
        else setLoaded(false);
    }, [userEntries])

    useEffect(() => {
        setUserEntries(Object.values(allEntries).filter(entry => entry.user_id === user.id && entry.is_public === true && entry.comments.length >= 1));
    }, [allEntries, user])

    useEffect(() => {
        let otherEntries = Object.values(allEntries).filter(entry => entry.user_id !== user.id && entry.is_public == true && entry.comments.length >= 1)
        let commentedentries = [];
        for (let entry of otherEntries) {
            for (let comment of entry.comments) {
                if (comment.user_id === user.id && !commentedentries.includes(entry)) {
                    commentedentries.unshift(entry)
                }
            }
        }
        setCommentEntries(commentedentries);
    }, [allEntries, user])


    return (
        <div>
            <div>
                <p className='mini-page-title' ></p>
                <h1 id='homepage-user-title'>{`${user?.name}'s Comments`}</h1>
                <p className="comments-page-mini-title">All of your entries others have commented on:</p>
                <div id='homepage-notebook-card-container'>
                    {userEntries.length ? userEntries.map(entry => (
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
                : <div className="no-public-posts">No one has commented on any of your posts yet.</div>}
                </div>
            </div>
            <div>
                <p className='mini-page-title' ></p>
                <p className="comments-mini-page-title">All public posts you have commented on:</p>
                <div id='homepage-notebook-card-container'>
                    {commentEntries ? commentEntries.map(entry => (
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
                            </div>
                        </div>
                    ))
                : <div className="no-public-posts">No one has commented on any of your posts yet.</div>}
                </div>
            </div>

        </div>
    )
}


export default CommentsPage;
