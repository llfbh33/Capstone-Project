import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import parser from 'html-react-parser'


function EntryPreview() {
    const { entryId } = useParams();
    const entry = useSelector(state => state.entries[entryId]);


    if (!entry) {
        return (
            <div className='dash-comp-container'>
                <div className='pannel-formatting'>
                    Loading...
                </div>
            </div>
        )
    }

    return (
        <div className='selected-entry-container'>
            <div className='list-section selected-entry-data'>
                <div className='scroll-contain'>
                    <div className="list-scroll selected-entry-data-inner">
                        <div className="notebook-about-section" type="HTML">{parser(entry.content)}</div>
                    </div>
                </div>
            </div>
        </div>
    )

}


export default EntryPreview
