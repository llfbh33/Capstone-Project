

import { useSelector } from "react-redux";
import { FaRegFileAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useNav } from "../../../context/Navigation/NavigationContext";
import './DashComponents.css';
import { FaArrowRightLong } from "react-icons/fa6";
import { useMemo } from "react";


const RecentEntries = () => {
    const navigate = useNavigate();
    const { setActiveNav } = useNav();
    const notebooksObj = useSelector(state => state.notebooks);
    const entriesObj = useSelector(state => state.entries);
    const entries = useMemo(() => {
        return Object.values(entriesObj).sort(
            (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
        ).slice(0, 2);
    }, [entriesObj]);



    const handleClickEntry = (entry) => {
        setActiveNav('notebooks');
        navigate(`/notebook/${entry.notebook_id}/entries/${entry.id}`)
    }

    const handleClickAllEntries = () => {
        setActiveNav('allEntries');
        navigate(`/all_entries`);
    }


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
        <div className='dash-comp-container'>
            <div className='pannel-formatting'>
                <div className='pannel-heading'>
                    <h2>Your Recent Entries</h2>
                    <div className="view-all" onClick={handleClickAllEntries}>
                        <div>View all</div>
                        <FaArrowRightLong />
                    </div>
                </div>
                <div className='pannel-contents'>
                    {entries.map((page, index) => (
                        <div className='pannel-item action-item' onClick={() => handleClickEntry(page)} key={`entry-${index}`}>
                            <div className='pannel-item-icon'>
                                <FaRegFileAlt />
                            </div>
                            <div className='pannel-item-data-container'>
                                <div className="pannel-item-title">
                                    {page.name}
                                </div>
                                <div className="pannel-item-description">
                                    {notebooksObj[page.notebook_id]?.name}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
};


export default RecentEntries;