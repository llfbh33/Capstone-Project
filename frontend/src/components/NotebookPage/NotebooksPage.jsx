import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { FaPlus } from "react-icons/fa6";

import NewNotebookFormModal from "../Modals/NotebookModals/NewNotebookModal";
// import { useNav } from "../../context/Navigation/NavigationContext";
import { useModal } from '../../context/Modal/Modal';
// import './NotebooksPage.css'
// import LoadingPage from "../LoadingPage/LoadingPage";
import FeaturedNotebook from "./NotebookComponents/FeaturedNotebook";
import { friendlyDate } from "../../utils/utils";
import NotebookActions from "./NotebookComponents/NotebookActions";



const notebookImages = [
    './greenNotebook.png',
    './brownNotebook.png',
    './darkBlueNotebook.png',
    './magentaNotebook.png',
    './orangeNotebook.png',
    './blueNotebook.png',
]


function NotebooksPage() {
    const user = useSelector(state => state.session.user);
    // const { setActiveNav } = useNav();
    const notebookObj = useSelector(state => state.notebooks);
    const notebooks = useMemo(() => {
        return Object.values(notebookObj).sort(
            (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
        );
    }, [notebookObj]);
    const featuredNotebook = notebooks.find(notebook => notebook.is_featured) || notebooks[0];
    // const [theseNotebooks, setTheseNotebooks] = useState('');
    const { setModalContent } = useModal();
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (notebooks) setTheseNotebooks(notebooks)
    // }, [notebooks])

    // useEffect(() => {
    //     if (theseNotebooks) setLoading(false)
    // }, [theseNotebooks])

    const handleClickNotebook = (id) => {
        navigate(`/notebook/${id}`)
    }

    const handleNewNotebook = () => {
        let modalComponent = <NewNotebookFormModal />
        setModalContent(modalComponent);
    }



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
        <div className="page-container page-grow">
            <div className="navigation-tabs" onClick={() => navigate('/notebooks')}>
                Notebooks
            </div>
            <div className='header-flex-col'>
                <div className='header-flex-row'>
                    <h1>{`${user?.name}'s Notebook's`}</h1>
                    <div className="new-search-notebooks-container">
                        <button
                            className="new-notebook-button"
                            onClick={handleNewNotebook}
                        >
                            <div className="new-notebook-text">
                                <FaPlus />
                                <p>New Notebook</p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            {/* <div className="component-container component-row"> */}
                <div className="component-container component-col">
                    <FeaturedNotebook notebook={featuredNotebook} handleClickNotebook={handleClickNotebook} />
                    <div className="all-notebooks-container">
                        <div className="all-notebooks-action">
                            <p>All Notebooks</p>
                            <p>Sorted by: Last Created</p>
                        </div>
                        <div className="notebooks-block-container">
                            {notebooks.map((notebook, index) => {
                                if (notebook.id === featuredNotebook.id) return <></>
                                else return (
                                    <div className='dash-comp-container individual-notebooks' key={notebook.id} onClick={() => handleClickNotebook(notebook.id)}>
                                        <div className='pannel-formatting'>
                                            <div className='notebook-pannel-heading'>
                                                <img className="book-image-all" src={notebookImages[index % 6]}></img>
                                                <div style={{ display: "flex", alignItems: "center", minHeight: "50px" }}>
                                                    <NotebookActions notebook={notebook} handleClickNotebook={handleClickNotebook} />
                                                </div>
                                            </div>
                                            <div className="notebook-panel-container">
                                                <h3>{notebook.name}</h3>
                                                <p>
                                                    {notebook.about.length > 160 ? `${notebook.about.slice(0, 160)}...` : notebook.about}
                                                </p>

                                                <div className="notebook-last-edited">
                                                    <span>Last edited - </span>
                                                    <span>{friendlyDate(notebook.updated_at)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            {/* </div> */}
        </div>
    )
}


export default NotebooksPage;
