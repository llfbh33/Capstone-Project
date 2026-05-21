
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useNav } from "../../../context/Navigation/NavigationContext";
import { SlNotebook } from "react-icons/sl";
import { FaArrowRightLong } from "react-icons/fa6";
import './DashComponents.css';



const RecentNotebooks = () => {
    const navigate = useNavigate();
    const { setActiveNav } = useNav();
    const notebooksObj = useSelector(state => state.notebooks);
    const notebooks = useMemo(() => {
        return Object.values(notebooksObj).sort(
            (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
        ).slice(0, 2);
    }, [notebooksObj]);


    const handleAllNotebooks = () => {
        setActiveNav('notebooks');
        navigate("/notebooks");
    };

    const handleClickNotebook = (id) => {
        setActiveNav('notebooks');
        navigate(`/notebook/${id}`);
    };


    if (!notebooks) {
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
                    {notebooks.map((book, index) => (
                        <div className='pannel-item action-item' onClick={() => handleClickNotebook(book.id)} key={`notebook-${index}`}>
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