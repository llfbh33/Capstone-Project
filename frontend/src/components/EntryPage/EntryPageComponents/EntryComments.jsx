import { useState } from "react";

const EntryComments = () => {
    const [showComments, setShowComments] = useState(false);

    return (
        <div className="entry-comments-container">
            <div className="section-layout section-row">
                <div className='entry-items-container'>
                <div className="inner-comments-container">
                Comments go here
                </div>
            </div>
            </div>
        </div>
    )
};

export default EntryComments;