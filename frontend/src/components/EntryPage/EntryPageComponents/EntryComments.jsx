import { useState } from "react";

const EntryComments = () => {
    const [showComments, setShowComments] = useState(false);

    return (
        <>
            {showComments ? (
                <></>
            ) : (
                <div className="content-panel panel-row" style={{ justifyContent: "space-between" }}>
                    <div>Comments Currently Closed</div>
                    <div>Open</div>
                </div>
            )}
        </>
    )
};

export default EntryComments;