import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { BsTrash3Fill } from "react-icons/bs";
import { GoPencil } from "react-icons/go";
import parser from 'html-react-parser'

import OpenModalMenuItem from "../Modals/OpenModalButton/OpenModalMenuItem"

import EditEntryNameFormModal from "../Modals/EntryModals/EditEntryNameModal";
import DeleteEntryFormModal from "../Modals/EntryModals/DeleteEntryModal";
import { MdOpenInNew } from "react-icons/md";
import { friendlyDate } from "../../utils/utils";



/* ARE WE USING THIS PAGE ANYMORE???   */
function EntryPreviewPage() {

    const { entryId } = useParams();
    const entry = useSelector(state => state.entries[entryId]);
    const notebooks = useSelector(state => state.notebooks)
    const [loaded, setLoaded] = useState(false)


    useEffect(() => {
        if (entry) {
            setLoaded(true)
        }
    }, [entry])

    const handleClickEntry = () => {

    }


    if (loaded) {
        return (

            <div className='section-layout section-col'>
                <div className="section-layout section-row">
                    <div className='selected-entry-horizontal-container'>
                        <div className='selected-entry-container'>
                            <div className='label-and-icons'>
                                <div className='label-and-icons-header'>
                                    <span className="entry-preview-title">
                                        {entry.name}

                                        <span
                                            className="title-edit-trigger"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <OpenModalMenuItem
                                                itemText={<GoPencil className="icon-container" />}
                                                modalComponent={<EditEntryNameFormModal entry={entry} setSelectedEntry={entry} />}
                                            />
                                        </span>
                                    </span>
                                    <div className='notebook-icon-container'>
                                        <div className='icon-container' onClick={handleClickEntry}><MdOpenInNew /></div>
                                        <div className='icon-container'>
                                            <OpenModalMenuItem
                                                itemText={<BsTrash3Fill />}
                                                modalComponent={<DeleteEntryFormModal entry={entry} setSelectedEntry={entry} />}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div>{notebooks[entry.notebook_id].name}</div>
                                <div className='create-space-between'>
                                    <div className='alignment'>
                                        <div>{friendlyDate(entry.updated_at)}</div>
                                        <div>•</div>
                                        <div>{`Comments: ${entry.comments.length}`}</div>
                                    </div>
                                    {entry.is_public && <p className='is-published'>Published •</p>}
                                </div>
                            </div>
                            {/* <div className="selected-entry-data"> */}
                            <div className='list-section selected-entry-data'>
                                <div className='scroll-contain'>
                                    <div className="list-scroll selected-entry-data-inner">
                                        <div className="notebook-about-section" type="HTML">{parser(entry.content)}</div>
                                    </div>
                                </div>
                            </div>
                            <div className='selected-entry-footer'>
                                {/* <div className='selected-footer-format'>
                                    <div className='alignment movement-click' onClick={() => handleNewSelected('left')}>
                                        <MdKeyboardArrowLeft /> Previous
                                    </div>
                                    <div className='alignment movement-click' onClick={() => handleNewSelected('right')}>
                                        Next <MdKeyboardArrowRight />
                                    </div>
                                </div> */}
                                {/* <div className='selected-footer-format'>
                                                <div className='no-movement'>
                                                    {selectedIndex - 1 >= 0 ? entries[selectedIndex - 1].name : entries[entries.length - 1].name}
                                                </div>
                                                <div style={{ textAlign: "right" }} className='no-movement'>
                                                    {selectedIndex + 1 < entries.length ? entries[selectedIndex + 1].name : entries[0].name}
                                                </div>
                                            </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            //         </div>
            //     </div>
            // </div>


            // <div className="entry-preview-content-container">

            //     {entry?.content
            //     ? <div className="entry-preview-content-container">
            //         <div id='entry-preview-content-preview' type='HTML'>{entry.content ? parser(entry.content) : ''}</div>
            //     </div>
            //     : <p id='entry-preview-content'>{`It looks like you havn't written anything yet.  Click on the edit entry button to get started!`}</p>}

            //     {entry?.content === '<p></p>' && <p>{`It looks like you havn't written anything yet.  Click on the edit entry button to get started!`}</p>}

            //     <h1 className='entrypage-underline'></h1>
            //     <div>
            //         {entry.comments.length
            //         ? <div>
            //             <h2>Comments on your Entry:</h2>
            //             {entry?.comments.map(comment => (
            //                 <div key={comment.id} className="singular-post-container">

            //                     <div className="public-post-comment-title-singular">
            //                         <div className="user-info-for-comment-singular">
            //                             <img src={allUsers[comment.user_id]?.profile_image} />
            //                             <div>{allUsers[comment.user_id]?.username}</div>
            //                         </div>
            //                         <div className="edit-delete-btns-singular">
            //                             {comment.user_id === currUser.id
            //                             ? <div className="homepage-edit-notebook" >
            //                                 <OpenModalMenuItem
            //                                 itemText={<FaEdit />}
            //                                 modalComponent={<EditCommentModal comment={comment} />}
            //                                 />
            //                             </div>
            //                             : ''}
            //                             <div className="homepage-edit-notebook" >
            //                                 <OpenModalMenuItem
            //                                 itemText={<BsTrash3Fill />}
            //                                 modalComponent={<DeleteCommentModal comment={comment} />}
            //                                 />
            //                             </div>
            //                         </div>
            //                     </div>

            //                     <div className="entrypage-comment">
            //                         {comment.comment}
            //                     </div>
            //                 </div>
            //             ))}
            //         </div>
            //         : <h3>You have no comments on this entry</h3>}
            //     </div>
            //     <div className="singular-space-container"></div>
            //     <h1 className='entrypage-underline'></h1>
            // </div>
        )
    }
}


export default EntryPreviewPage
