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
            <div className='selected-entry-container'>
                <div className='entries-list-section selected-entry-data'>
                    <div className='entry-scroll-contain'>
                        <div className="entry-list-scroll selected-entry-data-inner">
                            <div className="notebook-about-section" type="HTML">{parser(entry.content)}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default EntryPreview
