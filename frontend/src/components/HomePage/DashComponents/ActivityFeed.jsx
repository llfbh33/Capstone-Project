import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { MdOutlineSignpost } from "react-icons/md";
import { FaRegFileAlt } from "react-icons/fa";
import { MdLocalPostOffice } from "react-icons/md";
import { SlNotebook } from "react-icons/sl";

import './DashComponents.css';

const activities = [
    {
        type: "notebook",
        date: "May 14, 2026",
        text: "Created a new notebook: 'Dream Journal'",
    },
    {
        type: "entry",
        date: "May 13, 2026",
        text: "Added a new entry to 'Captain Simian’s Odyssey'",
    },
    {
        type: "post",
        date: "May 12, 2026",
        text: "Published 'Chapter 2: The Frozen Coast'",
    },
    {
        type: "comment",
        date: "May 11, 2026",
        text: "Commented on 'The Last Lantern'",
    },
    {
        type: "entry",
        date: "May 10, 2026",
        text: "Updated 'Morning Reflections'",
    },
    {
        type: "post",
        date: "May 9, 2026",
        text: "Received 3 comments on 'The Rise of Captain Simian'",
    },
    {
        type: "notebook",
        date: "May 14, 2026",
        text: "Created a new notebook: 'Dream Journal'",
    },
    {
        type: "entry",
        date: "May 13, 2026",
        text: "Added a new entry to 'Captain Simian’s Odyssey'",
    },
    {
        type: "post",
        date: "May 12, 2026",
        text: "Published 'Chapter 2: The Frozen Coast'",
    },
    {
        type: "comment",
        date: "May 11, 2026",
        text: "Commented on 'The Last Lantern'",
    },
    {
        type: "entry",
        date: "May 10, 2026",
        text: "Updated 'Morning Reflections'",
    },
    {
        type: "post",
        date: "May 9, 2026",
        text: "Received 3 comments on 'The Rise of Captain Simian'",
    },
    {
        type: "notebook",
        date: "May 14, 2026",
        text: "Created a new notebook: 'Dream Journal'",
    },
    {
        type: "entry",
        date: "May 13, 2026",
        text: "Added a new entry to 'Captain Simian’s Odyssey'",
    },
    {
        type: "post",
        date: "May 12, 2026",
        text: "Published 'Chapter 2: The Frozen Coast'",
    },
    {
        type: "comment",
        date: "May 11, 2026",
        text: "Commented on 'The Last Lantern'",
    },
    {
        type: "entry",
        date: "May 10, 2026",
        text: "Updated 'Morning Reflections'",
    },
    {
        type: "post",
        date: "May 9, 2026",
        text: "Received 3 comments on 'The Rise of Captain Simian'",
    },
    {
        type: "notebook",
        date: "May 14, 2026",
        text: "Created a new notebook: 'Dream Journal'",
    },
    {
        type: "entry",
        date: "May 13, 2026",
        text: "Added a new entry to 'Captain Simian’s Odyssey'",
    },
    {
        type: "post",
        date: "May 12, 2026",
        text: "Published 'Chapter 2: The Frozen Coast'",
    },
    {
        type: "comment",
        date: "May 11, 2026",
        text: "Commented on 'The Last Lantern'",
    },
    {
        type: "entry",
        date: "May 10, 2026",
        text: "Updated 'Morning Reflections'",
    },
    {
        type: "post",
        date: "May 9, 2026",
        text: "Received 3 comments on 'The Rise of Captain Simian'",
    },
];

const activityType = {
    post: <MdOutlineSignpost />,
    entry: <FaRegFileAlt />,
    comment: <MdLocalPostOffice />,
    notebook: <SlNotebook />

}


const ActivityFeed = () => {

    return (
        <div className='dash-comp-container'>
            <div className='pannel-formatting'>
                <div className='pannel-heading'>
                    <h2>Your Recent Activities</h2>
                </div>
                <div className=' activities-contain'>
                    <div className="activity-timeline">
                        {/* {activities.map((activity, index) => (
                            <div className="activity-item" key={index}>
                                <div className="activity-marker">
                                    <div className="activity-dot" />
                                </div>

                                <div className="activity-content">
                                    <div className="activity-date">{activity.date}</div>
                                    <div className="activity-text">{activity.text}</div>
                                </div>
                            </div>
                        ))}
                    </div> */}
                        <VerticalTimeline layout="1-column-left" >
                            {activities.map((activity, index) => (
                                <div key={`activity-${index}`} style={{ marginBottom: "50px" }}>
                                    <VerticalTimelineElement
                                        contentStyle={{
                                            background: "rgb(11, 13, 94)",
                                            color: "#ffffff",
                                            border: "1px solid rgba(255,255,255,0.08)",
                                            boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
                                        }}
                                        contentArrowStyle={{
                                            borderRight: "7px solid rgb(11, 13, 94)",
                                        }}
                                        className="vertical-timeline-element--work"
                                        date="2024 - present"
                                        iconStyle={{
                                            background: "rgb(11, 13, 94)",
                                            color: "#fff",
                                            size: "22px",
                                        }}
                                        icon={activityType[activity.type]}
                                    >
                                        <h3 className="vertical-timeline-element-title">Creative Director</h3>
                                        <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
                                        <p>Creative Direction, User Experience, Visual Design</p>
                                    </VerticalTimelineElement>
                                </div>
                            ))}
                        </VerticalTimeline>
                    </div>
                </div>
            </div>
        </div>
    )
};


export default ActivityFeed;