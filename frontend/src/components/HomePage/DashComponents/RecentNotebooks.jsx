
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SlNotebook } from "react-icons/sl";
import { FaArrowRightLong } from "react-icons/fa6";
import './DashComponents.css';



const RecentNotebooks = () => {
    const notebooks = useSelector(state => state.notebooks);
    const navigate = useNavigate();
    const [notebookArray, setNotebookArray] = useState();
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (!notebooks) return;

        const sortedNotebooks = Object.values(notebooks)
            .sort((a, b) =>
                new Date(b.updated_at) - new Date(a.updated_at)
            )
            .slice(0, 2);

        setNotebookArray(sortedNotebooks);
        setLoading(false);

    }, [notebooks]);



    const handleAllNotebooks = () => {
        navigate("/notebooks");
    };

    const handleClickNotebook = (id) => {
        // const newActiveState = {
        //     main: { title: 'notebooks', route: '/notebooks', open: true },
        //     mid: { title: id, route: `/notebook/${id}`, open: true },
        //     small: { title: null, route: null, open: false }
        // };
        // setActiveNav(newActiveState);
        navigate(`/notebook/${id}`);
    };



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
                    <h2>Your Notebooks</h2>
                    <div className="view-all" onClick={handleAllNotebooks}>
                        <div>View all</div>
                        <FaArrowRightLong />
                    </div>
                </div>
                <div className='pannel-contents'>
                    {notebookArray.map((book, index) => (
                        <div className='pannel-item' onClick={() => handleClickNotebook(book.id)} key={`notebook-${index}`}>
                            <div className='pannel-item-icon'>
                                <SlNotebook />
                            </div>
                            <div className='pannel-item-data-container'>
                                <div className="pannel-item-title">
                                    {book.name}
                                </div>
                                <div className="pannel-item-description">
                                    {`${book.about.slice(0, 40)}${book.about.length > 40 ? "..." : ""}`}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
};


export default RecentNotebooks;