import { useEffect, useState, useMemo } from "react";
import { useDispatch } from "react-redux"
import { thunkLoadEntries } from "../../../redux/entry"
import { thunkPublicationOfPost, thunkEditPost } from "../../../redux/posts";
import { useModal } from "../../../context/Modal/Modal";
import { useNavigate } from "react-router-dom";
import { useNav } from "../../../context/Navigation/NavigationContext";
import './PostModals.css'

const categories = [
    "Fiction",
    "Nonfiction",
    "Poetry",
    "Essay",
    "Journal",
    "Reflection",
    "Random Thoughts"
]


function RemovePostModal({ post }) {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { setActiveNav } = useNav();
    const { closeModal } = useModal();
    const [title, setTitle] = useState(post.title);
    const [message, setMessage] = useState(post.message);
    const [category, setCategory] = useState(post.post_type);
    const [search, setSearch] = useState(post?.post_type || "");
    const [showSearchDropdown, setShowSearchDropdown] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const active = post.is_active
    const [includeLength, setIncludeLength] = useState(false);
    const searchCategories = useMemo(() => {
        let filtered = categories;

        if (!search.trim()) return filtered;

        return filtered.filter(category =>
            category.toLowerCase().includes(search.toLowerCase())
        );
    }, [categories, search])


    useEffect(() => {
        const errors = {};
        if (message.length <= 0) setMessage(' ')
        if (message.length > 250) errors.message = 'Message can not be more than 250 characters'

        if (title.length > 150) errors.title = 'Title can not be more than 150 characters'
        setValidationErrors(errors)
    }, [message, title])

    const postEntry = async (e) => {
        e.preventDefault();

        if (Object.values(validationErrors).length) return;

        const serverResponse = await dispatch(thunkEditPost({
            id: post.id,
            title,
            message,
            is_active: true,
            post_type: category,
            show_read_length: includeLength,
        }));

        if (serverResponse.errors) {
            setValidationErrors(serverResponse.errors);
        } else {
            await dispatch(thunkLoadEntries());
            setActiveNav('public');
            navigate(`/public/${serverResponse.id}`)
            closeModal();
        }
    }

    const removePublication = async () => {
        const safePost = {
            id: post.id,
            is_active: !active
        }

        await dispatch(thunkPublicationOfPost(safePost))
        await dispatch(thunkLoadEntries())
        await closeModal()
        return
    }

    const doNotRemove = () => {
        closeModal()
        return
    }

    return (
        <>
            {active ? <div id='post-remove-modal-container'>
                <h2 className="delete-post-wrap">{`Are you sure you want to remove "${post?.name}" from the public feed?`}</h2>
                <h4 className="post-remove-disclaimer">{`Don't worry, all the comments on your post will stay with your entry so you can continue to have the advice of other members.`}</h4>
                <div id='remove-post-button-container'>
                    <button className="modal-button conformation-btn" onClick={removePublication}>Yes, Remove Post</button>
                    <button className="modal-button conformation-btn" onClick={doNotRemove}>No, Keep Post Public</button>
                </div>
            </div>
                :
                <div className='post-modal-main-container'>
                    <h1 className="post-modal-titles">{`Publish your Entry?`}</h1>
                    <div className="post-modal-form-container">
                        <label>What would you like to label your post?</label>
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                        <p className="post-modal-errors">{validationErrors.title ? validationErrors.title : ''}</p>
                        <div>
                            <label>Categorize your post?</label>
                            <div className="filter-search-input">
                                <input
                                    className="all-entries-filter-component"
                                    value={search}
                                    placeholder="Search categories..."
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                        setShowSearchDropdown(true);
                                    }}
                                    onFocus={() => setShowSearchDropdown(true)}
                                    onBlur={() => {
                                        setTimeout(() => {
                                            setShowSearchDropdown(false);
                                        }, 100);
                                    }}
                                />
                                {showSearchDropdown && searchCategories.length > 0 && (
                                    <div className="search-dropdown">
                                        {searchCategories.map((item, index) => (
                                            <div
                                                key={index}
                                                className="search-dropdown-item"
                                                onClick={() => {
                                                    setCategory(item);
                                                    setSearch(item);
                                                    setShowSearchDropdown(false);
                                                }}
                                            >
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div>
                            <label>Display the length of the post?</label>
                            <button onClick={() => setIncludeLength(true)}>Yes</button>
                            <button onClick={() => setIncludeLength(false)}>No</button>
                        </div>
                        <div className="post-modal-label">Would you like to include a message with your post?</div>
                        <div className="post-modal-label-2">This is not necessary, but it can help others understand what you are trying to acheive with your writing.</div>
                        <textarea
                            type='text'
                            rows={7}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}>
                        </textarea>
                        <p className={validationErrors.message ? "post-modal-errors" : 'post-modal-no-errors'}>{`${message.length}/250`}</p>
                    </div>
                    <div className='post-modal-conformation-btn-container'>
                        <button className="modal-button conformation-btn" onClick={postEntry}>Yes, Make Public</button>
                        <button className="modal-button conformation-btn" onClick={doNotRemove}>No, Keep Private</button>
                    </div>
                </div>
            }
        </>
    )
}

export default RemovePostModal
