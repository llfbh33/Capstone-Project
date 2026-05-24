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
// import './NotebookPage.css'
import { friendlyDate } from '../../utils/utils';
import parser from 'html-react-parser'
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import EditEntryNameFormModal from '../Modals/EntryModals/EditEntryNameModal';
import { FaRegFileAlt } from "react-icons/fa";
import { RxReset } from "react-icons/rx";




const AllEntries = () => {
    const notebooks = useSelector(state => state.notebooks)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const entriesObj = useSelector(state => state.entries);
    const entries = useMemo(() => {
        return Object.values(entriesObj)
            .sort(
                (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
            );
    }, [entriesObj]);
    const [selectedEntry, setSelectedEntry] = useState(null);
    const selectedIndex = useMemo(() => {
        if (selectedEntry) {
            return entries.indexOf(selectedEntry)
        } else return 0;
    }, [entries, selectedEntry])
    const { setModalContent } = useModal();
    const entryRefs = useRef({});

    const [selectedNotebook, setSelectedNotebook] = useState(null);
    const [showNotebookDropdown, setShowNotebookDropdown] = useState(false);

    const [search, setSearch] = useState("");
    const [showSearchDropdown, setShowSearchDropdown] = useState(false);
    const searchEntries = useMemo(() => {
        let filtered = entries;

        if (selectedNotebook !== null) {
            filtered = filtered.filter(
                entry => entry.notebook_id === selectedNotebook.id
            );
        }

        if (!search.trim()) return filtered;

        return filtered.filter(entry =>
            entry.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [entries, search, selectedNotebook]);


    // Scroll the selected entry in the list into view
    useEffect(() => {
        if (!selectedEntry?.id) return;

        entryRefs.current[selectedEntry.id]?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
        });
    }, [selectedEntry?.id]);



    const handleClickEntry = () => {
        navigate(`/notebook/${selectedEntry.notebook_id}/entries/${selectedEntry.id}`);
        setSelectedEntry(null);
    }

    const handleNewEntry = () => {
        alert("Set up a modal where you can select the notebook")
        // let modalComponent = <CreateEntryNameFormModal />
        // setModalContent(modalComponent);
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
        <div className="main-container">
            <div className="child-container">
                <div className="child-container-two">
                    <div className="navigation-tabs-container" >
                        <div className="navigation-tabs" onClick={() => navigate('/allEntries')}>All Entries</div>
                    </div>
                    <div className="padding-container-header-notebooks">
                        <h1 className="page-title"><FaRegFileAlt /> All Entries</h1>
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
                    <div className='entry-items-container'>
                        <div className="notebook-description-container">
                            <div className="featured-label-container">
                                <span>Browse and search through all of your writing</span>
                            </div>
                            <div className="all-entries-filter-container">
                                <div class="filter-search-input">
                                    <input
                                        className="all-entries-filter-component"
                                        value={search}
                                        placeholder="Search entries..."
                                        onChange={(e) => {
                                            setSearch(e.target.value);
                                            setShowSearchDropdown(true);
                                        }}
                                        onFocus={() => setShowSearchDropdown(true)}
                                    />
                                    {showSearchDropdown && searchEntries.length > 0 && (
                                        <div className="search-dropdown">
                                            {searchEntries.map(entry => (
                                                <div
                                                    key={entry.id}
                                                    className="search-dropdown-item"
                                                    onClick={() => {
                                                        setSelectedEntry(entry);
                                                        setShowSearchDropdown(false);
                                                    }}
                                                >
                                                    {entry.name}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div class="filter-search-input">
                                    <div
                                        className="all-entries-filter-component notebook-dropdown-trigger"
                                        onClick={() => setShowNotebookDropdown(prev => !prev)}
                                    >
                                        {`${selectedNotebook ? selectedNotebook.name : "Notebooks: All"}`}
                                    </div>

                                    {showNotebookDropdown && (
                                        <div className="search-dropdown">
                                            <div
                                                className="search-dropdown-item"
                                                onClick={() => {
                                                    setSelectedNotebook(null);
                                                    setShowNotebookDropdown(false);
                                                }}
                                            >
                                                Notebooks: All
                                            </div>

                                            {Object.values(notebooks).map(notebook => (
                                                <div
                                                    key={notebook.id}
                                                    className="search-dropdown-item"
                                                    onClick={() => {
                                                        setSelectedNotebook(notebook);
                                                        setShowNotebookDropdown(false);
                                                    }}
                                                >
                                                    {notebook.name}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <input
                                    className='all-entries-filter-component'
                                    placeholder="Sort: Last Updated"
                                    disabled={true}
                                />
                            </div>
                        </div>
                        <div className="items-container">
                            <div className="horizontal-container">
                                <div className="all-entries-container">
                                    <div className="all-entries-action">
                                        <p className='sub-title'>{`Entries (${searchEntries.length})`}</p>
                                        <div className='icon-container' onClick={() => setSearch('')}><RxReset /></div>
                                    </div>
                                </div>
                                <div className='entries-list-section'>
                                    <div className='entry-scroll-contain'>
                                        <div className="entry-list-scroll">
                                            {searchEntries.map((entry, index) => (
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
                                            <div>{notebooks[selectedEntry.notebook_id].name}</div>
                                            <div className='create-space-between'>
                                                <div className='alignment'>
                                                    <div>{friendlyDate(selectedEntry.updated_at)}</div>
                                                    <div>•</div>
                                                    <div>{`Comments: ${selectedEntry.comments.length}`}</div>
                                                </div>
                                                {selectedEntry.is_public && <p className='is-published'>Published •</p>}
                                            </div>
                                        </div>
                                        <div className="selected-entry-data">
                                            <div className="notebook-about-section">{`${parser(selectedEntry.content).slice(0, 600)}...`}</div>
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
            </div>
        </div>
    )
};

export default AllEntries;