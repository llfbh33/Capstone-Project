import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import './EntryPageComponents.css';


const NavigateEntries = ({ entry }) => {
    const selectedIndex = 1;
    const entries = [entry];

    const handleNewSelected = () => {

    }


    return (
        // <div className='entry-items-container'>
        <div className="entry-content-panel">
            <div className='entry-nav-styling'>
                <div className='selected-footer-format'>
                    <div className='alignment movement-click' onClick={() => handleNewSelected('left')}>
                        <MdKeyboardArrowLeft /> Previous
                    </div>
                    <div className='alignment movement-click' onClick={() => handleNewSelected('right')}>
                        Next <MdKeyboardArrowRight />
                    </div>
                </div>
                <div className='selected-footer-format'>
                    <div className='no-movement'>
                        {selectedIndex - 1 >= 0 ? entries[selectedIndex - 1].name : entries[entries.length - 1].name}
                    </div>
                    <div style={{ textAlign: "right" }} className='no-movement'>
                        {selectedIndex + 1 < entries.length ? entries[selectedIndex + 1].name : entries[0].name}
                    </div>
                </div>
            </div>
        </div>
        // </div>
    )
};

export default NavigateEntries;