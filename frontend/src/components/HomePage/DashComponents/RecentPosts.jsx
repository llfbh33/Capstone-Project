import { SlNotebook } from "react-icons/sl";
import './DashComponents.css';


const RecentPosts = () => {

    return (
        <div className='dash-comp-container'>
            <div className='pannel-formatting'>
                <div className='pannel-heading'>
                    <h2>Your Recent Posts</h2>
                    <div>View all</div>
                </div>
                <div className='pannel-contents'>
                    <div className='pannel-item'>
                        <div className='pannel-item-icon'>
                            <SlNotebook />
                        </div>
                        <div className='pannel-item-data-container'>
                            <div className="pannel-item-title">
                                This is my title
                            </div>
                            <div className="pannel-item-description">
                                This is my description
                            </div>
                        </div>
                    </div>
                    <div className='pannel-item'>
                        <div className='pannel-item-icon'>
                            <SlNotebook />
                        </div>
                        <div className='pannel-item-data-container'>
                            <div className="pannel-item-title">
                                This is my title
                            </div>
                            <div className="pannel-item-description">
                                This is my description
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};


export default RecentPosts;