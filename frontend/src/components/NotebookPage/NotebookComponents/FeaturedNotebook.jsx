// import { FaRegFileAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import "./NotebookComponents.css";
import { friendlyDate } from "../../../utils/utils";

const FeaturedNotebook = ({ notebook, handleClickNotebook }) => {
  console.log(notebook)
  return (
    <div className="featured-notebook-container">
      <div className="featured-label-container">
        <span>Featured Notebook</span>
        <FaStar />
      </div>
      <div className="featured-notebook-data">
        <div className="notebook-cover">
          {/* <FaRegFileAlt /> */}
          <img className="book-image" src='./purpleNotebook.png'></img>
        </div>

        <div className="featured-info">
          <div className="featured-header">
            <h3>{notebook.name}</h3>
            <div className="notebook-edit" onClick={() => handleClickNotebook(notebook.id)}>
              <div>Continue writing?</div>
            </div>
          </div>

          <p>
             {notebook.about.length > 200 ? `${notebook.about.slice(0, 200)}...` : notebook.about}
          </p>

          <div className="featured-meta">
            <span>Last edited</span>
            <span>{friendlyDate(notebook.updated_at)}</span>
          </div>

          <div className="featured-bottom">
            <span>4,532 words</span>
          </div>

          {/* <div className="progress-area">
            <span>68% complete</span>
            <div className="progress-track">
              <div className="progress-fill"></div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default FeaturedNotebook;