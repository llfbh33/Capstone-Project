import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNav } from "../../../context/Navigation/NavigationContext";
import { SlNotebook } from "react-icons/sl";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import './DashComponents.css';



const RecentPosts = () => {
    const user = useSelector(state => state.session.user)
    const allEntries = useSelector(state => state.entries)
    const navigate = useNavigate();
     const { setActiveNav } = useNav();
    const [entries] = useState(Object.values(allEntries).filter(entry => entry.user_id === user.id && entry.is_public === true))
    const [entryArray, setEntryArray] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (!entries) return;

        const sortedEntries = entries
            // .sort((a, b) =>
            //     new Date(b.post.created_at) - new Date(a.post.created_at)
            // )
            // .slice(0, 2);

        setEntryArray(sortedEntries);
        setLoading(false);

    }, [entries]);


    const handleAllPosts = () => {
        navigate('/public/user');
    }

    const handleClickPost = (id) => {
        setActiveNav('posts');
        navigate(`/public/${id}`);
    };

    if (loading) return;


    return (
        <div className='dash-comp-container'>
            <div className='pannel-formatting'>
                <div className='pannel-heading'>
                    <h2>Your Recent Posts</h2>
                    <div className="view-all" onClick={handleAllPosts}>
                        <div>View all</div>
                        <FaArrowRightLong />
                    </div>
                </div>
                <div className='pannel-contents'>
                    {entryArray.map((page, index) => (
                        <div className='pannel-item action-item' key={`entry-${index}`} onClick={() => handleClickPost(page.id)}>
                            <div className='pannel-item-icon'>
                                <SlNotebook />
                            </div>
                            <div className='pannel-item-data-container'>
                                <div className="pannel-item-title">
                                    {page.name}
                                </div>
                                <div className="pannel-item-description">
                                    {/* {page.post.created_at} */}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
};


export default RecentPosts;