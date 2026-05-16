import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { useNav } from "../../../context/Navigation/NavigationContext";
import { MdOutlineSignpost } from "react-icons/md";
import { FaRegFileAlt } from "react-icons/fa";
import { MdLocalPostOffice } from "react-icons/md";
import { SlNotebook } from "react-icons/sl";
import { useNavigate } from "react-router-dom";

import './DashComponents.css';

const activities = [
    {
        type: "notebook",
        date: "May 14, 2026",
        text: "Created a new notebook: 'Dream Journal'",
        notebook_id: null,
        type_id: 2,
    },
    {
        type: "entry",
        date: "May 13, 2026",
        text: "Added a new entry to 'Captain Simian’s Odyssey'",
        notebook_id: 1,
        type_id: 9
    },
    {
        type: "post",
        date: "May 12, 2026",
        text: "Published 'Chapter 2: The Frozen Coast'",
        notebook_id: null,
        type_id: 7,
    },
    {
        type: "comment",
        date: "May 11, 2026",
        text: "Commented on 'The Last Lantern'",
        notebook_id: null,
        type_id: 7,
    },
    {
        type: "entry",
        date: "May 10, 2026",
        text: "Updated 'Morning Reflections'",
        notebook_id: 2,
        type_id: 5
    },
    {
        type: "post",
        date: "May 9, 2026",
        text: "Received 3 comments on 'The Rise of Captain Simian'",
        notebook_id: null,
        type_id: 7,
    },
    {
        type: "notebook",
        date: "May 14, 2026",
        text: "Created a new notebook: 'Dream Journal'",
        notebook_id: null,
        type_id: 2,
    },
    {
        type: "entry",
        date: "May 13, 2026",
        text: "Added a new entry to 'Captain Simian’s Odyssey'",
        notebook_id: 1,
        type_id: 4
    },
    {
        type: "post",
        date: "May 12, 2026",
        text: "Published 'Chapter 2: The Frozen Coast'",
        notebook_id: null,
        type_id: 7,
    },
    {
        type: "comment",
        date: "May 11, 2026",
        text: "Commented on 'The Last Lantern'",
        notebook_id: null,
        type_id: 8,
    },
    {
        type: "entry",
        date: "May 10, 2026",
        text: "Updated 'Morning Reflections'",
        notebook_id: 1,
        type_id: 8
    },
    {
        type: "post",
        date: "May 9, 2026",
        text: "Received 3 comments on 'The Rise of Captain Simian'",
        notebook_id: null,
        type_id: 7,
    },
    {
        type: "notebook",
        date: "May 14, 2026",
        text: "Created a new notebook: 'Dream Journal'",
        notebook_id: null,
        type_id: 2,
    },
    {
        type: "entry",
        date: "May 13, 2026",
        text: "Added a new entry to 'Captain Simian’s Odyssey'",
        notebook_id: 2,
        type_id: 2
    },
    {
        type: "post",
        date: "May 12, 2026",
        text: "Published 'Chapter 2: The Frozen Coast'",
        notebook_id: null,
        type_id: 7,
    },
    {
        type: "comment",
        date: "May 11, 2026",
        text: "Commented on 'The Last Lantern'",
        notebook_id: null,
        type_id: 8,
    },
    {
        type: "entry",
        date: "May 10, 2026",
        text: "Updated 'Morning Reflections'",
        notebook_id: 3,
        type_id: 9,
    },
    {
        type: "post",
        date: "May 9, 2026",
        text: "Received 3 comments on 'The Rise of Captain Simian'",
        notebook_id: null,
        type_id: 7,
    },
    {
        type: "notebook",
        date: "May 14, 2026",
        text: "Created a new notebook: 'Dream Journal'",
        notebook_id: null,
        type_id: 2,
    },
    {
        type: "entry",
        date: "May 13, 2026",
        text: "Added a new entry to 'Captain Simian’s Odyssey'",
        notebook_id: 2,
        type_id: 6
    },
    {
        type: "post",
        date: "May 12, 2026",
        text: "Published 'Chapter 2: The Frozen Coast'",
        notebook_id: null,
        type_id: 7,
    },
    {
        type: "comment",
        date: "May 11, 2026",
        text: "Commented on 'The Last Lantern'",
        notebook_id: null,
        type_id: 8,
    },
    {
        type: "entry",
        date: "May 10, 2026",
        text: "Updated 'Morning Reflections'",
        notebook_id: 1,
        type_id: 4
    },
    {
        type: "post",
        date: "May 9, 2026",
        text: "Received 3 comments on 'The Rise of Captain Simian'",
        notebook_id: null,
        type_id: 7,
    },
];

const activityType = {
    post: <MdOutlineSignpost />,
    entry: <FaRegFileAlt />,
    comment: <MdLocalPostOffice />,
    notebook: <SlNotebook />

}

const activityNav = {
    post: "/public/",
    notebook: "/notebook/",
    comment: "/public/",
    entry: ["/notebook/", "/entries/"]
}




const ActivityFeed = () => {
    const navigate = useNavigate();
    const { setActiveNav } = useNav();

    const handleclick = (activity) => {

        if (activity.type === 'entry') {
            navigate(`${activityNav[activity.type][0]}${activity.notebook_id}${activityNav[activity.type][1]}${activity.type_id}`)
        } else {
            navigate(`${activityNav[activity.type]}${activity.type_id}`)
        }

        if (activity.type === 'post' || activity.type === 'comment') {
            setActiveNav('public');
        } else {
            setActiveNav('notebooks');
        }
    }

    return (
        <div className='dash-comp-container'>
            <div className='pannel-formatting'>
                <div className='pannel-heading'>
                    <h2>Your Recent Activities</h2>
                </div>
                <div className=' activities-contain'>
                    <div className="activity-timeline">
                        <VerticalTimeline layout="1-column-left" >
                            {activities.map((activity, index) => (
                                <div key={`activity-${index}`} style={{ marginBottom: "50px" }} onClick={() => handleclick(activity)}>
                                    <VerticalTimelineElement
                                        contentStyle={{
                                            // background: "rgb(11, 13, 94)",
                                            color: "#ffffff",
                                            border: "1px solid rgba(255,255,255,0.08)",
                                            boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
                                            cursor: "pointer",
                                        }}
                                        contentArrowStyle={{
                                            // borderRight: "7px solid rgb(11, 13, 94)",
                                        }}
                                        className="vertical-timeline-element--work activity-post"
                                        date={activity.date}
                                        iconStyle={{
                                            background: "rgb(11, 13, 94)",
                                            color: "#fff",
                                            size: "22px",
                                        }}
                                        icon={activityType[activity.type]}
                                    >
                                        {/* <h3 className="vertical-timeline-element-title">Creative Director</h3> */}
                                        <h4 className="vertical-timeline-element-subtitle" style={{paddingTop: "10px"}}>{activity.text}</h4>
                                        {/* <p></p> */}
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