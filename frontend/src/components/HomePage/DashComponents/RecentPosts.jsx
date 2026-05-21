import { useSelector } from "react-redux";
import { useMemo } from "react";
import { useNav } from "../../../context/Navigation/NavigationContext";
import { SlNotebook } from "react-icons/sl";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import './DashComponents.css';



const RecentPosts = () => {
    const navigate = useNavigate();
    const { setActiveNav } = useNav();
    const postsObj = useSelector(state => state.posts)
    const posts = useMemo(() => {
        return Object.values(postsObj).sort(
            (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
        ).slice(0, 2);
    }, [postsObj]);


    const handleAllPosts = () => {
        navigate('/public/user');
    }

    const handleClickPost = (id) => {
        setActiveNav('posts');
        navigate(`/public/${id}`);
    };

    if (!posts) {
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
                    <h2>Your Recent Posts</h2>
                    <div className="view-all" onClick={handleAllPosts}>
                        <div>View all</div>
                        <FaArrowRightLong />
                    </div>
                </div>
                <div className='pannel-contents'>
                    {posts.map((page, index) => (
                        <div className='pannel-item action-item' key={`post-${index}`} onClick={() => handleClickPost(page.id)}>
                            <div className='pannel-item-icon'>
                                <SlNotebook />
                            </div>
                            <div className='pannel-item-data-container'>
                                <div className="pannel-item-title">
                                    {page.title}
                                </div>
                                <div className="pannel-item-description">
                                    {page.updated_at}
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