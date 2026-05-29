import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { useState, useMemo, useEffect, useRef } from 'react';

import { BsTrash3Fill } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { GoPencil } from "react-icons/go";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

import { friendlyDate } from '../../utils/utils';
import { useModal } from '../../context/Modal/Modal';
import OpenModalMenuItem from '../Modals/OpenModalButton/OpenModalMenuItem';
import CreateEntryNameFormModal from '../Modals/EntryModals/CreateEntryNameModal';
import EditNotebookFormModal from '../Modals/NotebookModals/EditNotebookModal';
import DeleteNotebookFormModal from '../Modals/NotebookModals/DeleteNotebookModal';
import { thunkFeaturedNotebook } from '../../redux/notebook';

import SearchBar from '../ReusableComponents/SearchComponents/SearchBar';
import SearchClearWithTitle from '../ReusableComponents/SearchComponents/SearchClearWithTitle';
import SelectedPreview from '../ReusableComponents/SelectedPreview/SelectedPreview';
import './NotebookPage.css'




function NotebookPage() {
    const { notebookId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const entryRefs = useRef({});
    const { setModalContent } = useModal();
    const notebook = useSelector(state => state.notebooks[notebookId]);
    const entriesObj = useSelector(state => state.entries);
    // Filters and sorts entries of notebook, saved as memo for auto updates to entries and notebook
    const entries = useMemo(() => {
        return Object.values(entriesObj)
            .filter(entry => entry.notebook_id === parseInt(notebookId))
            .sort(
                (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
            );
    }, [entriesObj, notebookId]);

    const [search, setSearch] = useState("");
    const [selectedEntry, setSelectedEntry] = useState(null);
    // Filters Entries Depending on Users Search
    const searchEntries = useMemo(() => {
        let filtered = entries;

        if (notebook !== null) {
            filtered = filtered.filter(
                entry => entry.notebook_id === notebook.id
            );
        }

        if (!search.trim()) return filtered;

        return filtered.filter(entry =>
            entry.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [entries, search, notebook]);


    //-----------------------------------------------------------------


    // Scroll the selected entry in the list into view
    useEffect(() => {
        if (!selectedEntry?.id) return;

        entryRefs.current[selectedEntry.id]?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
        });
    }, [selectedEntry?.id]);


    //-----------------------------------------------------------------

    // Clears the Search of Entries
    const handleClearEntries = () => {
        setSearch('');
    };

    // Opens New Entry Modal
    const handleNewEntry = () => {
        let modalComponent = <CreateEntryNameFormModal />
        setModalContent(modalComponent);
    }

    // Sets the Featured Notebook
    const handleSetFeatured = async (e) => {
        e.stopPropagation();
        await dispatch(thunkFeaturedNotebook(notebook.id))
    };

    // Sets the Notebook Selection
    const handleSelectedEntry = (entry) => {
        if (selectedEntry?.id === entry.id) {
            setSelectedEntry(null);
        } else {
            setSelectedEntry(entry)
        }
    };

    //-----------------------------------------------------------------


    if (!entries) {
        return (
            <div className='dash-comp-container'>
                <div className='pannel-formatting'>
                    Loading...
                </div>
            </div>
        )
    }


    return (
        <div className="page-container page-static">
            <div className="navigation-tabs-container" >
                <div className="navigation-tabs" onClick={() => navigate('/notebooks')}>Notebooks</div>
                <div className="navigation-intermediary">{`>`}</div>
                <div className="navigation-tabs" onClick={() => navigate(`/notebook/${notebookId}`)}>{notebook.name.length > 30 ? `${notebook.name.slice(0, 30)}...` : notebook.name}</div>
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
            <div className='section-layout section-col'>
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
                <div className="section-layout section-row">
                    <div className="section-layout section-col">
                        <SearchBar
                            search={search}
                            setSearch={setSearch}
                            searchPlaceholder={"Search entries..."}
                            searchArray={searchEntries}
                            setSelectedItem={setSelectedEntry}
                        />

                        <SearchClearWithTitle item={searchEntries} handleClear={handleClearEntries} />

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
}

export default NotebookPage
