import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import { useMemo } from "react";
import parser from 'html-react-parser'

import { GoPencil } from "react-icons/go";
import { MdOpenInNew } from "react-icons/md";
import { BsTrash3Fill } from "react-icons/bs";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";

import OpenModalMenuItem from '../../Modals/OpenModalButton/OpenModalMenuItem';
import EditEntryNameFormModal from '../../Modals/EntryModals/EditEntryNameModal';
import DeleteEntryFormModal from '../../Modals/EntryModals/DeleteEntryModal';
import { friendlyDate } from '../../../utils/utils';

// subtitle is either the notebook name or the post message
const SelectedPreview = ({ selected, setSelected, searchArray, subtitle, published }) => {
    const navigate = useNavigate();
    const notebooks = useSelector(state => state.notebooks);
    const selectedIndex = useMemo(() => {
        if (selected) {
            return searchArray.indexOf(selected)
        } else return 0;
    }, [searchArray, selected]);


    // Navigates to Selected Items Page - In posts or entries
    const handleClickEntry = () => {
        if (published) {
            navigate(`/public/${selected.id}`);
        } else {
            navigate(`/notebook/${selected.notebook_id}/entries/${selected.id}`);
        }
        
        setSelectedEntry(null);
    };

    const handleNewSelected = (direction) => {
        let newSelected;
        if (direction === 'left') {
            newSelected = selectedIndex - 1 >= 0 ? searchArray[selectedIndex - 1] : searchArray[searchArray.length - 1];
        } else {
            newSelected = selectedIndex + 1 < searchArray.length ? searchArray[selectedIndex + 1] : searchArray[0];
        }

        setSelected(newSelected);
    };


    return (
        <div className='selected-entry-horizontal-container'>
            <div className='selected-entry-container'>
                <div className='label-and-icons'>
                    <div className='label-and-icons-header'>
                        <span className="entry-preview-title">
                            {selected.name || selected.title}

                            {!published && <span
                                className="title-edit-trigger"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <OpenModalMenuItem
                                    itemText={<GoPencil className="icon-container" />}
                                    modalComponent={<EditEntryNameFormModal entry={selected} setSelectedEntry={setSelected} />}
                                />
                            </span>}
                        </span>
                        <div className='notebook-icon-container'>
                            <div className='icon-container' onClick={handleClickEntry}><MdOpenInNew /></div>
                            {!published && <div className='icon-container'>
                                <OpenModalMenuItem
                                    itemText={<BsTrash3Fill />}
                                    modalComponent={<DeleteEntryFormModal entry={selected} setSelectedEntry={setSelected} />}
                                />
                            </div>}
                        </div>
                    </div>
                    <div>{subtitle}</div>
                    <div className='create-space-between'>
                        <div className='alignment'>
                            <div>{friendlyDate(selected.updated_at)}</div>
                            <div>•</div>
                            <div>{`Comments: ${selected.comments.length}`}</div>
                        </div>
                        {selected.is_public && <p className='is-published'>Published •</p>}
                    </div>
                </div>
                {/* <div className="selected-entry-data"> */}
                <div className='list-section selected-entry-data'>
                    <div className='scroll-contain'>
                        <div className="list-scroll selected-entry-data-inner">
                            <div className="notebook-about-section" type="HTML">{published ? parser(selected.entry.content) : parser(selected.content)}</div>
                        </div>
                    </div>
                </div>

                <div className='selected-entry-footer'>
                    <div className='selected-footer-format'>
                        <div className='alignment movement-click' onClick={() => handleNewSelected('left')}>
                            <MdKeyboardArrowLeft /> Previous
                        </div>
                        <div className='alignment movement-click' onClick={() => handleNewSelected('right')}>
                            Next <MdKeyboardArrowRight />
                        </div>
                    </div>
                    <div className='selected-footer-format'>
                        <div className='no-movement'>
                            {selectedIndex - 1 >= 0 ? (searchArray[selectedIndex - 1]?.name || searchArray[selectedIndex - 1]?.title) : (searchArray[searchArray.length - 1]?.name || searchArray[searchArray.length - 1]?.title)}
                        </div>
                        <div style={{ textAlign: "right" }} className='no-movement'>
                            {selectedIndex + 1 < searchArray.length ? (searchArray[selectedIndex + 1]?.name || searchArray[selectedIndex + 1]?.title) : (searchArray[0]?.name || searchArray[0]?.title)}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default SelectedPreview;