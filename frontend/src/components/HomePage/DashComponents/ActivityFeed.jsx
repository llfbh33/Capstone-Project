import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { useNav } from "../../../context/Navigation/NavigationContext";
import { useSelector } from 'react-redux';
import { MdOutlineSignpost } from "react-icons/md";
import { FaRegFileAlt } from "react-icons/fa";
import { MdLocalPostOffice } from "react-icons/md";
import { SlNotebook } from "react-icons/sl";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import './DashComponents.css';


const activityType = {
    post: {
        create: <MdOutlineSignpost />,
        update: <MdOutlineSignpost />,
        delete: <MdDelete />,
    },
    entry: {
        create: <FaRegFileAlt />,
        update: <FaRegFileAlt />,
        delete: <MdDelete />,
    },
    comment: {
        create: <MdLocalPostOffice />,
        update: <MdLocalPostOffice />,
        delete: <MdDelete />,
    },
    notebook: {
        create: <SlNotebook />,
        update: <SlNotebook />,
        delete: <MdDelete />,
    },
    delete: <MdDelete />,
}

// const activityNav = {
//     post: "/public/",
//     notebook: "/notebook/",
//     comment: "/public/",
//     entry: ["/notebook/", "/entries/"]
// }



const ActivityFeed = () => {
    const navigate = useNavigate();
    const { setActiveNav } = useNav();
    const activities = useSelector(state => [...Object.values(state.activities)].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
    ));

    const handleclick = (activity) => {

        if (activity.action_type === "delete") {
            alert("This item has been deleted and is no longer recoverable");
            return;
        }
        
        navigate(`${activity.route}`)

        if (activity.target_type === 'post' || activity.target_type === 'comment') {
            setActiveNav('public');
        } else {
            setActiveNav('notebooks');
        }
    }
    

    if (!activities) return;


    return (
        <div className='dash-comp-container'>
            <div className='pannel-formatting'>
                <div className='pannel-heading'>
                    <h2>Your Recent Activities</h2>
                </div>
                <div className=' activities-contain'>
                    <div className="activity-timeline">
                        <VerticalTimeline layout="1-column-left" >
                            {activities.map((activity) => (
                                <div key={`activity-${activity.id}`} style={{ marginBottom: "50px" }} onClick={() => handleclick(activity)}>
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
                                        date={activity.created_at}
                                        iconStyle={{
                                            background: "rgb(11, 13, 94)",
                                            color: "#fff",
                                            size: "22px",
                                        }}
                                        icon={activityType[activity.target_type][activity.action_type]}
                                    >
                                        {/* <h3 className="vertical-timeline-element-title">Creative Director</h3> */}
                                        <h4 className="vertical-timeline-element-subtitle" style={{ paddingTop: "10px" }}>{activity.text}</h4>
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