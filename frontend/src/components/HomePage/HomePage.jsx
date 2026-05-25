
import { useSelector } from "react-redux";

// import NewNotebookFormModal from "../Modals/NotebookModals/NewNotebookModal";
// import EditNotebookFormModal from "../Modals/NotebookModals/EditNotebookModal"
// import OpenModalMenuItem from "../Modals/OpenModalButton/OpenModalMenuItem"
// import DeleteNotebookFormModal from "../Modals/NotebookModals/DeleteNotebookModal";
// import DeleteEntryFormModal from "../Modals/EntryModals/DeleteEntryModal";
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
    const [theseNotebooks, setTheseNotebooks] = useState('');
    const [loading, setLoading] = useState(true);
    // const { setModalContent } = useModal();


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
        <div className="page-container page-static">
            <div className="header-flex-col">
                <h1>{`Welcome Back, ${user?.name}! 👋`}</h1>
                <p className="page-sub-title">A snapshot of your writing journey.</p>
            </div>

            <div className="component-container component-row">
                <div className="component-container component-col">
                    <ActivityFeed />
                    <InspiringQuotes />
                </div>
                <div className="component-container component-col">
                    <RecentNotebooks />
                    <RecentEntries />
                    <RecentPosts />
                </div>
            </div>

        </div>
    )
}


export default HomePage;
