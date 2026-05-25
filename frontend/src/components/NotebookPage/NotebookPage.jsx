import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from "react-redux";
import { useState, useMemo, useEffect, useRef } from 'react';
import { BsTrash3Fill } from "react-icons/bs";
import { MdOpenInNew } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { GoPencil } from "react-icons/go";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import DeleteNotebookFormModal from '../Modals/NotebookModals/DeleteNotebookModal';
import EditNotebookFormModal from '../Modals/NotebookModals/EditNotebookModal';
import { thunkFeaturedNotebook } from '../../redux/notebook';
import { useDispatch } from "react-redux";
import CreateEntryNameFormModal from '../Modals/EntryModals/CreateEntryNameModal';
import DeleteEntryFormModal from '../Modals/EntryModals/DeleteEntryModal';
import OpenModalMenuItem from '../Modals/OpenModalButton/OpenModalMenuItem';
import { useModal } from '../../context/Modal/Modal';
import './NotebookPage.css'
import { friendlyDate } from '../../utils/utils';
import parser from 'html-react-parser'
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import EditEntryNameFormModal from '../Modals/EntryModals/EditEntryNameModal';




function NotebookPage() {
    const { notebookId } = useParams();
    const notebook = useSelector(state => state.notebooks[notebookId]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const entriesObj = useSelector(state => state.entries);
    const entries = useMemo(() => {
        return Object.values(entriesObj)
            .filter(entry => entry.notebook_id === parseInt(notebookId))
            .sort(
                (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
            );
    }, [entriesObj, notebookId]);
    const [selectedEntry, setSelectedEntry] = useState(null);
    const selectedIndex = useMemo(() => {
        if (selectedEntry) {
            return entries.indexOf(selectedEntry)
        } else return 0;
    }, [entries, selectedEntry])
    const { setModalContent } = useModal();

    const entryRefs = useRef({});



    // Scroll the selected entry in the list into view
    useEffect(() => {
        if (!selectedEntry?.id) return;

        entryRefs.current[selectedEntry.id]?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
        });
    }, [selectedEntry?.id]);



    const handleClickEntry = () => {
        navigate(`/notebook/${notebookId}/entries/${selectedEntry.id}`);
        setSelectedEntry(null);
    }

    const handleNewEntry = () => {
        let modalComponent = <CreateEntryNameFormModal />
        setModalContent(modalComponent);
    }

    const handleSetFeatured = async (e) => {
        e.stopPropagation();
        await dispatch(thunkFeaturedNotebook(notebook.id))
    };

    const handleSelectedEntry = (entry) => {
        if (selectedEntry?.id === entry.id) {
            setSelectedEntry(null);
        } else {
            setSelectedEntry(entry)
        }
    };

    const handleNewSelected = (direction) => {
        let newSelected;
        if (direction === 'left') {
            newSelected = selectedIndex - 1 >= 0 ? entries[selectedIndex - 1] : entries[entries.length - 1];
        } else {
            newSelected = selectedIndex + 1 < entries.length ? entries[selectedIndex + 1] : entries[0];
        }

        setSelectedEntry(newSelected);
    };



    return (
        <div className="page-container page-static">
            <div className="navigation-tabs-container" >
                <div className="navigation-tabs" onClick={() => navigate('/notebooks')}>Notebooks</div>
                <div className="navigation-intermediary">{`>`}</div>
                <div className="navigation-tabs" onClick={() => navigate(`/notebook/${notebook.id}`)}>{notebook.name}</div>
            </div>
            <div className='header-flex-col'>
                <div className='header-flex-row'>
                    <h1>{notebook.name}</h1>
                    <div className="new-search-notebooks-container">
                        <button
                            className="new-notebook-button"
                            onClick={handleNewEntry}
                        >
                            <div className="new-notebook-text">
                                <FaPlus />
                                <p>New Entry</p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            <div className='entry-items-container'>
                <div className="notebook-description-container">
                    <div className="featured-label-container">
                        <span>Description</span>
                        <div className='notebook-icon-container'>
                            <div className='icon-container' onClick={(e) => handleSetFeatured(e)}>{notebook.is_featured ? <FaStar /> : <FaRegStar />}</div>
                            <div className='icon-container'>
                                <OpenModalMenuItem
                                    itemText={<GoPencil />}
                                    modalComponent={<EditNotebookFormModal notebook={notebook} />}
                                />
                            </div>
                            <div className='icon-container'>
                                <OpenModalMenuItem
                                    itemText={<BsTrash3Fill />}
                                    modalComponent={<DeleteNotebookFormModal notebook={notebook} />}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="featured-notebook-data">
                        <div className="notebook-about-section">{notebook.about}</div>
                    </div>
                </div>
            <div className="component-container component-row">
                <div className="component-container component-col">
                        <div className="all-entries-container">
                            <div className="all-entries-action">
                                <p className='sub-title'>{`Entries (${entries.length})`}</p>
                                <p>Sorted by: Last Updated</p>
                            </div>
                        </div>
                        <div className='entries-list-section'>
                            <div className='entry-scroll-contain'>
                                <div className="entry-list-scroll">
                                    {entries.map((entry, index) => (
                                        <div ref={(el) => {
                                            entryRefs.current[entry.id] = el;
                                        }}
                                            className={`entry-item-container ${selectedEntry?.id === entry.id ? "entry-item-selected" : "entry-item"}`} key={`entry-${index}`} onClick={() => handleSelectedEntry(entry)}>
                                            <div className='entry-card-title'>{entry.name}</div>

                                            <div className='alignment'>
                                                <div>{friendlyDate(entry.updated_at)}</div>
                                                <div>•</div>
                                                <div>{`Comments: ${entry.comments.length}`}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Container invisible unless an entry has been selected, this is a preview slide */}
                    {selectedEntry &&
                        <div className='selected-entry-horizontal-container'>
                            <div className='selected-entry-container'>
                                <div className='label-and-icons'>
                                    <div className='label-and-icons-header'>
                                        <span className="entry-preview-title">
                                            {selectedEntry.name}

                                            <span
                                                className="title-edit-trigger"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <OpenModalMenuItem
                                                    itemText={<GoPencil className="icon-container" />}
                                                    modalComponent={<EditEntryNameFormModal entry={selectedEntry} setSelectedEntry={setSelectedEntry} />}
                                                />
                                            </span>
                                        </span>
                                        <div className='notebook-icon-container'>
                                            <div className='icon-container' onClick={handleClickEntry}><MdOpenInNew /></div>
                                            <div className='icon-container'>
                                                <OpenModalMenuItem
                                                    itemText={<BsTrash3Fill />}
                                                    modalComponent={<DeleteEntryFormModal entry={selectedEntry} setSelectedEntry={setSelectedEntry} />}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='create-space-between'>
                                        <div className='alignment'>
                                            <div>{friendlyDate(selectedEntry.updated_at)}</div>
                                            <div>•</div>
                                            <div>{`Comments: ${selectedEntry.comments.length}`}</div>
                                        </div>
                                        {selectedEntry.is_public && <p className='is-published'>Published •</p>}
                                    </div>
                                </div>
                                <div className='entries-list-section selected-entry-data'>
                                    <div className='entry-scroll-contain'>
                                        <div className="entry-list-scroll selected-entry-data-inner">
                                            <div className="notebook-about-section" type="HTML">{parser(selectedEntry.content)}</div>
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
                                            {selectedIndex - 1 >= 0 ? entries[selectedIndex - 1].name : entries[entries.length - 1].name}
                                        </div>
                                        <div style={{ textAlign: "right" }} className='no-movement'>
                                            {selectedIndex + 1 < entries.length ? entries[selectedIndex + 1].name : entries[0].name}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default NotebookPage
