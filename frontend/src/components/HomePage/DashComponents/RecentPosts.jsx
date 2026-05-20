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
    const allPosts = useSelector(state => state.posts)
    const navigate = useNavigate();
    const { setActiveNav } = useNav();
    const [posts] = useState(Object.values(allPosts).filter(post => post.entry.user_id === user.id && post.is_active === true))
    const [postsArray, setPostsArray] = useState([]);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        if (!posts) return;

        const sortedPosts = posts.slice(posts.length - 2, posts.length).reverse();

        // const sortedPosts = posts
        //     .sort((a, b) =>
        //         new Date(b.updated_at) - new Date(a.updated_at)
        //     )
        //     .slice(0, 2);

        console.log(sortedPosts)
        setPostsArray(sortedPosts);
        setLoading(false);

    }, [posts]);


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
                    {postsArray.map((page, index) => (
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