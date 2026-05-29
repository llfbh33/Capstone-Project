import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useMemo, useState, useEffect, useRef } from "react"

import { MdLocalPostOffice } from "react-icons/md";
import { RxReset } from "react-icons/rx";

import SearchBar from "../ReusableComponents/SearchComponents/SearchBar"
import { friendlyDate, readLength } from "../../utils/utils"
import './PublicFeed.css'
import SearchClearWithTitle from "../ReusableComponents/SearchComponents/SearchClearWithTitle";
import SelectedPreview from "../ReusableComponents/SelectedPreview/SelectedPreview";



const lengths = [
    {
        id: "Short",
        name: "Short",
    },
    {
        id: "Medium",
        name: "Medium"
    },
    {
        id: "Long",
        name: "Long",
    },
    {
        id: "My Posts",
        name: "My Posts",
    }
]

function PublicFeed() {
    const navigate = useNavigate();
    const postRefs = useRef({});
    const currUser = useSelector(state => state.session.user);
    const postsObj = useSelector(state => state.posts);
    const usersObj = useSelector(state => state.users);
    // Filters and sorts posts, saved as memo for auto update on postsObj update
    const posts = useMemo(() => {
        return Object.values(postsObj)
            .filter(post => post.is_active === true)
            .sort(
                (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
            );
    }, [postsObj]);

    const [search, setSearch] = useState("");
    const [selectedLength, setSelectedLength] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);
    // Filters the posts depending on user search
    const searchPosts = useMemo(() => {
        let filtered = posts;

        if (selectedLength !== null) {
            filtered = filtered.filter(post => {
                if (selectedLength.name === "My Posts") {
                    return post.user_id === currUser.id;
                }

                if (!post.entry || post.entry.read_length === null) {
                    return false;
                }

                return readLength(post.entry.read_length) === selectedLength.name;
            });
        }

        if (!search.trim()) return filtered;

        return filtered.filter(post =>
            post.title.toLowerCase().includes(search.toLowerCase())
        );
    }, [posts, search, selectedLength, currUser.id]);

    //-----------------------------------------------------------------

    // Scroll the selected post in the list into view
    useEffect(() => {
        if (!selectedPost?.id) return;

        postRefs.current[selectedPost.id]?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
        });
    }, [selectedPost?.id]);

    //-----------------------------------------------------------------

    // Opens the Clicked Post
    const handleOpenPost = (id) => {
        navigate(`/public/${id}`);
    };

    // Clear Search and Filters
    const handleClearPosts = () => {
        setSearch('');
        setSelectedLength(null);
    };

    // Sets the Post Selection
    const handleSelectedPost = (post) => {
        if (selectedPost?.id === post.id) {
            setSelectedPost(null);
        } else {
            setSelectedPost(post)
        }
    };


    // Returns a tag for the read length of the post
    const handleReadLength = (count) => {
        if (count < 500) {
            return (
                <div className="read-length short-read">Short Read</div>
            )
        } else if (count >= 500 && count < 1500) {
            return (
                <div className="read-length med-read">Medium Read</div>
            )
        } else {
            return (
                <div className="read-length long-read">Long Read</div>
            )
        }
    };

    //-----------------------------------------------------------------


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
        <div className="page-container page-static">
            <div className="navigation-tabs-container" >
                <div className="navigation-tabs" onClick={() => navigate('/public')}>Public Feed</div>
            </div>
            <div className="header-flex-col">
                <h1>Public Feed</h1>
                <p>Discover what others are wrighting. A community of stories, thoughts, and ideas.</p>
            </div>
            <div className="section-layout section-col">

                <SearchBar
                    search={search}
                    setSearch={setSearch}
                    searchPlaceholder={"Search posts..."}
                    searchArray={searchPosts}
                    setSelectedItem={setSelectedPost}
                    filterPlaceholder={"All Lengths"}
                    selectedFilter={selectedLength}
                    setSelectedFilter={setSelectedLength}
                    filterArray={lengths}
                />

                <SearchClearWithTitle item={searchPosts} handleClear={handleClearPosts} />
                <div className="section-layout section-row">
                    <div className="section-layout section-col">
                        <div className='list-section'>
                            <div className='scroll-contain'>
                                <div className="list-scroll">
                                    {searchPosts.map(post => (
                                        <div ref={(el) => {
                                            postRefs.current[post.id] = el;
                                        }}
                                            className={`content-panel panel-col clickable-item ${selectedPost?.id === post.id ? "selected" : ""}`}
                                            key={post.id}
                                            onClick={() => handleSelectedPost(post)}
                                        >
                                            <div className="flex-row flex-space-between">
                                                <div className="flex-row username-image-container">
                                                    <img src={usersObj[post.user_id].profile_image}
                                                        className="post-profile-image"
                                                    />
                                                    <p>{usersObj[post.user_id].username}</p>
                                                </div>
                                                <p>{friendlyDate(post.updated_at)}</p>
                                            </div>
                                            <h3 className="remove-margin">{post.title}</h3>
                                            <p>{post.message}</p>
                                            <div className="flex-row flex-space-between">
                                                <div className="flex-row post-tag-spacing">
                                                    {post.show_read_length && handleReadLength(post.entry.read_length)}
                                                    <div><MdLocalPostOffice />{` ${post.comments.length} Comments`}</div>
                                                </div>
                                                <p className='is-published'>Published •</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    {selectedPost &&
                        <SelectedPreview
                            selected={selectedPost}
                            setSelected={setSelectedPost}
                            searchArray={searchPosts}
                            subtitle={selectedPost.message}
                            published={true}
                        />
                    }
                </div>
            </div>
        </div>
    )
}

export default PublicFeed


