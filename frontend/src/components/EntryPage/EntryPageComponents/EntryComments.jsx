import { useState } from "react";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import { MdLocalPostOffice } from "react-icons/md";
import { useSelector } from "react-redux";
import { friendlyDate } from "../../../utils/utils";
import './EntryPageComponents.css';





const EntryComments = ({ comments }) => {
    const [showComments, setShowComments] = useState(false);
    const users = useSelector(state => state.users)

    console.log('comments: ', comments)
    console.log(users)


    return (
        <>
            {showComments ? (
                <div className="content-panel panel-col panel-flex flex-space-between" style={{ maxHeight: "50%" }}>
                    <div className="section-layout section-row flex-space-between" style={{ maxHeight: "30px", alignItems: "center" }}>
                        <div><MdLocalPostOffice />{` Comments (${comments.length})`}</div>
                        <div onClick={() => setShowComments(false)} className="clickable-item">Close <MdOutlineKeyboardDoubleArrowUp /></div>
                    </div>
                    <div className="section-layout section-col">
                        <div className='entries-list-section selected-entry-data'>
                            <div className='entry-scroll-contain'>
                                <div className="entry-list-scroll selected-entry-data-inner">
                                    {comments.map((comment) => {
                                        const user = users[comment.user_id];

                                        return (
                                            <div className="content-panel panel-col">
                                                <div className="section-layout section-row flex-space-between">
                                                    <div className="section-layout section-row" style={{  alignItems: "center" }}>
                                                        <img src={user.profile_image} className="comment-profile-image" />
                                                        <p>{user.username}</p>
                                                    </div>
                                                    <div className="section-layout section-row" style={{  justifyContent: "flex-end" }}>
                                                        <p>{friendlyDate(comment.created_at)}</p>
                                                    </div>
                                                </div>
                                                <div>
                                                    {comment.comment}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="content-panel panel-row flex-space-between">
                    <div><MdLocalPostOffice />{` Comments (${comments.length})`}</div>
                    <div hidden={!comments.length} onClick={() => setShowComments(true)} className="clickable-item">Open <MdKeyboardDoubleArrowDown /></div>
                </div>
            )}
        </>
    )
};

export default EntryComments;