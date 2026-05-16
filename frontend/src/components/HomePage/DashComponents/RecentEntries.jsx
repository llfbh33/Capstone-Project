

import { useSelector } from "react-redux";
import { FaRegFileAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useNav } from "../../../context/Navigation/NavigationContext";
import './DashComponents.css';
import { FaArrowRightLong } from "react-icons/fa6";
import { useEffect, useState } from "react";


const RecentEntries = () => {
    const user = useSelector(state => state.session.user);
    const notebooks = useSelector(state => state.notebooks);
    const allEntries = useSelector(state => state.entries);
    const navigate = useNavigate();
    const { setActiveNav } = useNav();
    const [entries, setEntries] = useState(Object.values(allEntries).filter(entry => entry.user_id === user.id))
    const [entryArray, setEntryArray] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (!notebooks || !entries) return;

        const sortedEntries = entries
            .sort((a, b) =>
                new Date(b.updated_at) - new Date(a.updated_at)
            )
            .slice(0, 2);

        setEntryArray(sortedEntries);
        setLoading(false);

    }, [notebooks, entries])


    const handleClickEntry = (entry) => {
        setActiveNav('notebooks');
        navigate(`/notebook/${entry.notebook_id}/entries/${entry.id}`)
    }


    if (loading) {
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
                    <div className="view-all" onClick={() => alert('All Entries Page Coming Soon')}>
                        <div>View all</div>
                        <FaArrowRightLong />
                    </div>
                </div>
                <div className='pannel-contents'>
                    {entryArray.map((page, index) => (
                        <div className='pannel-item action-item' onClick={() => handleClickEntry(page)} key={`entry-${index}`}>
                            <div className='pannel-item-icon'>
                                <FaRegFileAlt />
                            </div>
                            <div className='pannel-item-data-container'>
                                <div className="pannel-item-title">
                                    {page.name}
                                </div>
                                <div className="pannel-item-description">
                                    {notebooks[page.notebook_id]?.name}
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