import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsTrash3Fill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";

// import NewNotebookFormModal from "../Modals/NotebookModals/NewNotebookModal";
import EditNotebookFormModal from "../Modals/NotebookModals/EditNotebookModal"
import OpenModalMenuItem from "../Modals/OpenModalButton/OpenModalMenuItem"
import DeleteNotebookFormModal from "../Modals/NotebookModals/DeleteNotebookModal";
import DeleteEntryFormModal from "../Modals/EntryModals/DeleteEntryModal";
import { useNav } from "../../context/Navigation/NavigationContext";
// import { useModal } from '../../context/Modal/Modal';
import './HomePage.css'
import { useEffect, useState } from "react";
import LoadingPage from "../LoadingPage/LoadingPage";
import ActivityFeed from "./DashComponents/ActivityFeed";
import InspiringQuotes from "./DashComponents/InspiringQuotes";
import RecentNotebooks from "./DashComponents/RecentNotebooks";
import RecentEntries from "./DashComponents/RecentEntries";
import RecentPosts from "./DashComponents/RecentPosts";



function HomePage() {
    const user = useSelector(state => state.session.user);
    const notebooks = useSelector(state => state.notebooks);
    const entries = useSelector(state => state.entries);
    const [theseNotebooks, setTheseNotebooks] = useState('');
    const [loading, setLoading] = useState(true);
    // const { setModalContent } = useModal();
    const navigate = useNavigate();
    const { setActiveNav } = useNav();

    useEffect(() => {
        if (notebooks) setTheseNotebooks(notebooks)
    }, [notebooks])

    useEffect(() => {
        if (theseNotebooks) setLoading(false)
    }, [theseNotebooks])


    // const handleNewNotebook = () => {
    //     let modalComponent =<NewNotebookFormModal />
    //     setModalContent(modalComponent);
    // }

    if (loading) {
        return <LoadingPage />
    }


    return (
        <div className="main-container">
            <div className="child-container">
                <div className="child-container-two">
                    <div className="padding-container-header">
                        <h1 className="page-title">{`Welcome Back, ${user?.name}! 👋`}</h1>
                        <p className="page-sub-title">A snapshot of your writing journey.</p>
                    </div>
                    <div className="items-container">
                        <div className="horizontal-container">
                            <ActivityFeed />
                            <InspiringQuotes />
                        </div>
                        <div className="horizontal-container">
                            <RecentNotebooks />
                            <RecentEntries />
                            <RecentPosts />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default HomePage;
