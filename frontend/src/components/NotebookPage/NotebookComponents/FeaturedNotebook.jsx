import { FaRegFileAlt } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import "./NotebookComponents.css";

const FeaturedNotebook = () => {
  return (
    <div className="featured-notebook-container">
      <span className="featured-label">Featured Notebook</span>

      <div className="featured-notebook-data">
        <div className="notebook-cover">
          {/* <FaRegFileAlt /> */}
          <img className="book-image" src='./purpleNotebook.png'></img>
        </div>

        <div className="featured-info">
          <div className="featured-header">
            <h3>Captain Simian&apos;s Odyssey</h3>
            <FiExternalLink />
          </div>

          <p>
            Here I am going to start my book about Captain Simian&apos;s
            travels through...
          </p>

          <div className="featured-meta">
            <span>Last edited</span>
            <span>May 2, 2024</span>
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