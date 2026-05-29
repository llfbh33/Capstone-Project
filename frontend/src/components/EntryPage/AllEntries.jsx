import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import { useState, useMemo, useEffect, useRef } from 'react';

import { FaPlus } from "react-icons/fa6";
import { FaRegFileAlt } from "react-icons/fa";

import { useModal } from '../../context/Modal/Modal';
import { friendlyDate } from '../../utils/utils';
import CreateEntryNoNotebookModal from '../Modals/EntryModals/CreateEntryNoNotebookModal';
import SearchBar from '../ReusableComponents/SearchComponents/SearchBar';
import SearchClearWithTitle from '../ReusableComponents/SearchComponents/SearchClearWithTitle';
import SelectedPreview from '../ReusableComponents/SelectedPreview/SelectedPreview';




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



    // Scroll the selected entry in the list into view
    useEffect(() => {
        if (!selectedEntry?.id) return;

        entryRefs.current[selectedEntry.id]?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
        });
    }, [selectedEntry?.id]);





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
                <div className="navigation-tabs" onClick={() => navigate('/all_entries')}>All Entries</div>
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
                                            className={`content-panel panel-col clickable-item ${selectedEntry?.id === entry.id ? "selected" : ""}`} 
                                            key={`entry-${index}`} 
                                            onClick={() => handleSelectedEntry(entry)}
                                        >
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

                    {selectedEntry &&
                        <SelectedPreview 
                            selected={selectedEntry} 
                            setSelected={setSelectedEntry} 
                            searchArray={searchEntries}
                            subtitle={selectedEntry.name}
                            published={false}
                        />
                    }
                </div>
            </div>
        </div>
    )
};

export default AllEntries;