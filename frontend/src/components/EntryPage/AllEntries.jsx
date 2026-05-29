import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import { useState, useMemo, useEffect, useRef } from 'react';
import { BsTrash3Fill } from "react-icons/bs";
import { MdOpenInNew } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { GoPencil } from "react-icons/go";
// import { FaRegStar } from "react-icons/fa";
// import { FaStar } from "react-icons/fa";
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
import CreateEntryNoNotebookModal from '../Modals/EntryModals/CreateEntryNoNotebookModal';
import SearchBar from '../ReusableComponents/SearchComponents/SearchBar';
import SearchClearWithTitle from '../ReusableComponents/SearchComponents/SearchClearWithTitle';




const AllEntries = () => {
    const notebooks = useSelector(state => state.notebooks)
    const navigate = useNavigate();
    const entriesObj = useSelector(state => state.entries);
    const entries = useMemo(() => {
        return Object.values(entriesObj)
            .sort(
                (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
            );
    }, [entriesObj]);
    const [selectedEntry, setSelectedEntry] = useState(null);
    const { setModalContent } = useModal();
    const entryRefs = useRef({});

    const [selectedNotebook, setSelectedNotebook] = useState(null);

    const [search, setSearch] = useState("");
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

    const selectedIndex = useMemo(() => {
        if (selectedEntry) {
            return searchEntries.indexOf(selectedEntry)
        } else return 0;
    }, [searchEntries, selectedEntry])


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
        let modalComponent = <CreateEntryNoNotebookModal notebook={selectedNotebook} />
        setModalContent(modalComponent);
    }


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
            newSelected = selectedIndex - 1 >= 0 ? searchEntries[selectedIndex - 1] : searchEntries[searchEntries.length - 1];
        } else {
            newSelected = selectedIndex + 1 < searchEntries.length ? searchEntries[selectedIndex + 1] : searchEntries[0];
        }

        setSelectedEntry(newSelected);
    };

    const handleFilterCondition = (id) => {
        if (selectedEntry?.notebook_id !== id) {
            setSelectedEntry(null);
        }
    };

    const handleClearEntries = () => {
        setSearch('');
        setSelectedNotebook(null);
    };


    return (
        <div className="page-container page-static">
            <div className="navigation-tabs-container" >
                <div className="navigation-tabs" onClick={() => navigate('/allEntries')}>All Entries</div>
            </div>
            <div className='header-flex-col'>
                <div className='header-flex-row'>
                    <h1><FaRegFileAlt /> All Entries</h1>
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
                <p>Browse and search through all of your writing</p>
            </div>
            <div className='section-layout section-col'>
                <SearchBar
                    search={search}
                    setSearch={setSearch}
                    searchPlaceholder={"Search entries..."}
                    searchArray={searchEntries}
                    setSelectedItem={setSelectedEntry}
                    filterPlaceholder={"Notebooks: All"}
                    selectedFilter={selectedNotebook}
                    setSelectedFilter={setSelectedNotebook}
                    filterArray={Object.values(notebooks)}
                    filterCondition={handleFilterCondition}
                />

                <SearchClearWithTitle item={searchEntries} handleClear={handleClearEntries} />

                <div className="section-layout section-row">
                    <div className="section-layout section-col">
                        <div className='list-section'>
                            <div className='scroll-contain'>
                                <div className="list-scroll">
                                    {searchEntries.map((entry, index) => (
                                        <div ref={(el) => {
                                            entryRefs.current[entry.id] = el;
                                        }}
                                            className={`content-panel panel-col clickable-item ${selectedEntry?.id === entry.id ? "selected" : ""}`} key={`entry-${index}`} onClick={() => handleSelectedEntry(entry)}>
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
                                {/* <div className="selected-entry-data"> */}
                                <div className='list-section selected-entry-data'>
                                    <div className='scroll-contain'>
                                        <div className="list-scroll selected-entry-data-inner">
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
                                            {selectedIndex - 1 >= 0 ? searchEntries[selectedIndex - 1]?.name : searchEntries[searchEntries.length - 1]?.name}
                                        </div>
                                        <div style={{ textAlign: "right" }} className='no-movement'>
                                            {selectedIndex + 1 < searchEntries.length ? searchEntries[selectedIndex + 1]?.name : searchEntries[0]?.name}
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
};

export default AllEntries;