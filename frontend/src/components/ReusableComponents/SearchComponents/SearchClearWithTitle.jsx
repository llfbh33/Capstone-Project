import { RxReset } from "react-icons/rx";
import './Search.css'

const SearchClearWithTitle = ({ item, handleClear }) => {

    return (
        <div className="search-clear-container">
            <p className='search-clear-title'>{`Posts (${item.length})`}</p>
            <div className='icon-container' onClick={handleClear}><RxReset /></div>
        </div>
    )
}

export default SearchClearWithTitle;