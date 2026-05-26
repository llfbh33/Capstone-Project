import { useState } from "react";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import { MdLocalPostOffice } from "react-icons/md";





const EntryComments = ({comments}) => {
    const [showComments, setShowComments] = useState(false);


    return (
        <>
            {showComments ? (
                <div className="content-panel panel-col panel-flex flex-space-between">
                    <div className="section-layout section-row flex-space-between" style={{maxHeight: "30px", alignItems: "center"}}>
                        <div><MdLocalPostOffice/>{` Comments (${comments.length})`}</div>
                        <div onClick={() => setShowComments(false)} className="clickable-item">Close <MdOutlineKeyboardDoubleArrowUp /></div>
                    </div>
                    <div className="section-layout section-col">
                        {comments.map((comment) => (
                            <div className="content-panel panel-col">
                                <div className="section-layout section-row">
                                    name, date, image, and trash
                                </div>
                                <div>
                                    comment content
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="content-panel panel-row flex-space-between">
                    <div><MdLocalPostOffice/>{` Comments (${comments.length})`}</div>
                    <div hidden={!comments.length} onClick={() => setShowComments(true)} className="clickable-item">Open <MdKeyboardDoubleArrowDown /></div>
                </div>
            )}
        </>
    )
};

export default EntryComments;