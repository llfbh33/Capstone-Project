import { useSelector } from "react-redux"
import { useMemo, useState, useEffect, useRef } from "react"
// import OpenModalMenuItem from "../Modals/OpenModalButton/OpenModalMenuItem"
// import RemovePostModal from "../Modals/PostModals/RemovePostModal"
import './PublicFeed.css'
import { useNavigate } from "react-router-dom"
// import parser from 'html-react-parser'
// import { BsTrash3Fill } from "react-icons/bs";
import { friendlyDate } from "../../utils/utils"
import { MdLocalPostOffice } from "react-icons/md";
import SearchBar from "../ReusableComponents/SearchBar"



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
    const postsObj = useSelector(state => state.posts);
    const allUsers = useSelector(state => state.users);
    const posts = useMemo(() => {
        return Object.values(postsObj)
            .filter(post => post.is_active === true)
            .sort(
                (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
            );
    }, [postsObj]);
    const currUser = useSelector(state => state.session.user);
    const navigate = useNavigate()
    const postRefs = useRef({});
    const [search, setSearch] = useState("");
    const [selectedLength, setSelectedLength] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);
    const readLength = (count) => {
        if (count < 500) {
            return "Short";
        } else if (count >= 500 && count < 1500) {
            return "Medium";
        } else {
            return "Long";
        }
    };


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
    }

    const handleOpenPost = (id) => {
        navigate(`/public/${id}`);
    };


    // Scroll the selected post in the list into view
    useEffect(() => {
        if (!selectedPost?.id) return;

        postRefs.current[selectedPost.id]?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
        });
    }, [selectedPost?.id]);





    return (
        <div className="page-container page-static">
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

                <div className="section-layout section-col">
                    <div className='entries-list-section'>
                        <div className='entry-scroll-contain'>
                            <div className="entry-list-scroll">
                                {searchPosts.map(post => (
                                    <div ref={(el) => {
                                        postRefs.current[post.id] = el;
                                    }}
                                        className={`content-panel panel-col clickable-item ${selectedPost?.id === post.id ? "selected" : ""}`} key={post.id} onClick={() => handleOpenPost(post.id)}>
                                        <div className="flex-row flex-space-between">
                                            <div className="flex-row username-image-container">
                                                <img src={allUsers[post.user_id].profile_image}
                                                    className="post-profile-image"
                                                />
                                                <p>{allUsers[post.user_id].username}</p>
                                            </div>
                                            <p>{friendlyDate(post.updated_at)}</p>
                                        </div>
                                        <h3 className="remove-margin">{post.title}</h3>
                                        <p>{post.message}</p>
                                        <div className="flex-row flex-space-between">
                                            <div className="flex-row" style={{ gap: "30px" }}>
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

            </div>
        </div>
    )
}

export default PublicFeed





{/* <p className='mini-page-explination'>Read what others have written and give them advice.  Remember to be respectful.</p> */ }
{/* <div className="publicfeed-post-title"> */ }
// <h1 className='title page-title'>Public Feed</h1>
// <h2 className="title page-subtitle">All Entries</h2>
{/* </div> */ }

// <div className="public-post-content-container">
// {posts.map(post => (
// <div key={post.id} className="postfeed-post-container">
// <div className="post-name-and-user-container">
// <h3 className="post-name">{post.title}</h3>
// <div className="post-username-image-container">
// <div className="image-and-username">

// <img src={allUsers[post?.user_id]?.profile_image} className="post-profile-image" />
// <h3>{allUsers[post?.user_id]?.username}</h3>
// </div>
// {post?.entry && post?.user_id === currUser.id
// ? <div className="homepage-edit-notebook">
// <OpenModalMenuItem
// itemText={<BsTrash3Fill />}
// modalComponent={<RemovePostModal post={post} />}
// />
// </div>
// : ''}

// </div>
// </div>
// <div className="small-post-container" onClick={() => navigate(`/public/${post.id}`)}>
// <div className="small-post-content">{post.message}</div>
// </div>
// <div className="post-seporating-bottom-border"></div>
// </div>
// ))}
// </div>

