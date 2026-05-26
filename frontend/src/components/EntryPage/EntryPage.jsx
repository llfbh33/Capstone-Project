import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";

import { useModal } from '../../context/Modal/Modal';
import DeleteEntryFormModal from "../Modals/EntryModals/DeleteEntryModal";
import OpenModalMenuItem from '../Modals/OpenModalButton/OpenModalMenuItem';
import EditEntryNameFormModal from "../Modals/EntryModals/EditEntryNameModal";
import EntryPreviewPage from "./EntryPreviewPage";
import EntryEditPage from "./EntryEditPage";
import PostPostModal from "../Modals/PostModals/PostEntryModal";
import RemovePostModal from "../Modals/PostModals/RemovePostModal";
import './EntryPage.css'
import LoadingPage from "../LoadingPage/LoadingPage";
import { useNavigate } from "react-router-dom";
import EntryPreview from "./EntryPageComponents/EntryPreview";
import EntryComments from "./EntryPageComponents/EntryComments";
import NavigateEntries from "./EntryPageComponents/NavigateEntries";
import { FaRegFileAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { GoPencil } from "react-icons/go";
import { friendlyDate } from "../../utils/utils";



function EntryPage() {
    const { notebookId, entryId } = useParams();
    const entry = useSelector(state => state.entries[entryId]);
    const post = useSelector(state =>
        Object.values(state.posts).find(post => post.entry_id === Number(entryId))
    );
    const [name, setName] = useState("");
    const [isPreview, setIsPreview] = useState(true);
    const [loaded, setLoaded] = useState(false);
    const notebook = useSelector(state => state.notebooks[notebookId])
    const { setModalContent } = useModal();
    const navigate = useNavigate();
    const comments = useMemo(() => {
        return entry.comments
            .sort(
                (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
            );
    }, [entry])


    useEffect(() => {
        if (entry) setLoaded(true);
    }, [entry])

    useEffect(() => {
        if (entry?.name) {
            setName(entry.name)
        }
    }, [entry])

    const previewSwitch = () => {
        setIsPreview(prev => !prev);
    }

    const publishEntry = () => {
        if (!post) {
            let modalComponent = <PostPostModal entry={entry} />
            setModalContent(modalComponent);
        } else {
            let modalComponent = <RemovePostModal post={post} />
            setModalContent(modalComponent)
        }
    }



    return (
        <div className="page-container page-static">
            <div className="navigation-tabs-container" id="helper_page_navigation">
                <div className="navigation-tabs" onClick={() => navigate('/notebooks')}>Notebooks</div>
                <div className="navigation-intermediary">{`>`}</div>
                <div className="navigation-tabs" onClick={() => navigate(`/notebook/${notebookId}`)}>{notebook.name.length > 30 ? `${notebook.name.slice(0, 30)}...` : notebook.name}</div>
                <div className="navigation-intermediary">{`>`}</div>
                <div className="navigation-tabs" onClick={() => navigate(`/notebook/${notebookId}/entries/${entry.id}`)}>{entry.name.length > 30 ? `${entry.name.slice(0, 30)}...` : entry.name}</div>
            </div>
            <div className='header-flex-col'>
                <div className='header-flex-row'>
                    <h1>
                        <FaRegFileAlt />{` ${entry.name}`}
                    {!isPreview && <span
                        className="title-edit-trigger"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <OpenModalMenuItem
                            itemText={<GoPencil className="icon-container" />}
                            modalComponent={<EditEntryNameFormModal entry={entry} />}
                        />
                    </span>}</h1>
                    <div className="new-search-notebooks-container">
                        <button
                            id="preview_button"
                            className="new-notebook-button"
                            onClick={() => setIsPreview(prev => !prev)}
                        >
                            <div className="new-notebook-text">
                                {/* <GoPencil /> */}
                                <p>{isPreview ? 'Edit Entry' : 'Preview'}</p>
                            </div>
                        </button>
                    </div>
                </div>
                <p>{`Entry from: ${notebook.name}`}</p>
                <div className='create-space-between'>
                    <div className='alignment'>
                        <div>{friendlyDate(entry.updated_at)}</div>
                        <div>•</div>
                        <div>{`Comments: ${entry.comments.length}`}</div>
                    </div>
                    {entry.is_public && <p className='is-published'>Published •</p>}
                </div>
            </div>

            <div className="section-layout section-col">
                {!isPreview ? <EntryEditPage entry={entry} setIsPreview={setIsPreview} /> : <EntryPreview entry={entry} />}
                <EntryComments comments={comments} />
                {/* <div className="entry-content-panel">
                    <div className='entry-nav-styling'>
                        <NavigateEntries entry={entry} />
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default EntryPage;
