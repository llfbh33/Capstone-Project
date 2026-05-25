import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { BsTrash3Fill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import parser from 'html-react-parser'

import DeleteCommentModal from "../../Modals/CommentModals/DeleteCommentModal";
import OpenModalMenuItem from "../../Modals/OpenModalButton/OpenModalMenuItem"
import EditCommentModal from "../../Modals/CommentModals/EditCommentModal";

import EditEntryNameFormModal from "../../Modals/EntryModals/EditEntryNameModal";
import DeleteEntryFormModal from "../../Modals/EntryModals/DeleteEntryModal";
import { useModal } from "../../../context/Modal/Modal";
import { MdOpenInNew } from "react-icons/md";
import { friendlyDate } from "../../../utils/utils";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";


function EntryPreview() {

    const { entryId } = useParams();
    const entry = useSelector(state => state.entries[entryId]);
    const notebooks = useSelector(state => state.notebooks)
    const allUsers = useSelector(state => state.users);
    const currUser = useSelector(state => state.session.user);
    const [loaded, setLoaded] = useState(false)
    const { setModalContent } = useModal();


    useEffect(() => {
        if (entry) {
            setLoaded(true)
        }
    }, [entry])

    const handleClickEntry = () => {

    }


    if (loaded) {
        return (

            <div className='entry-items-container'>
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
                            <div className='entries-list-section selected-entry-data'>
                                <div className='entry-scroll-contain'>
                                    <div className="entry-list-scroll selected-entry-data-inner">
                                        <div className="notebook-about-section" type="HTML">{parser(entry.content)}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default EntryPreview
