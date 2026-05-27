
import { useSelector } from "react-redux";
import './HomePage.css'
import ActivityFeed from "./DashComponents/ActivityFeed";
import InspiringQuotes from "./DashComponents/InspiringQuotes";
import RecentNotebooks from "./DashComponents/RecentNotebooks";
import RecentEntries from "./DashComponents/RecentEntries";
import RecentPosts from "./DashComponents/RecentPosts";



function HomePage() {
    const user = useSelector(state => state.session.user);


    return (
        <div className="page-container page-static">
            <div className="header-flex-col">
                <h1>{`Welcome Back, ${user?.name}! 👋`}</h1>
                <p>A snapshot of your writing journey.</p>
            </div>

            <div className="section-layout section-row">
                <div className="section-layout section-col">
                    <ActivityFeed />
                    <InspiringQuotes />
                </div>
                <div className="section-layout section-col">
                    <RecentNotebooks />
                    <RecentEntries />
                    <RecentPosts />
                </div>
            </div>

        </div>
    )
}


export default HomePage;
