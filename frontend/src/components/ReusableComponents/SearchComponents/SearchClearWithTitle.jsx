import { RxReset } from "react-icons/rx";

const SearchClearWithTitle = ({ item, handleClear }) => {

    return (
        <div className="all-entries-action">
            <p className='sub-title remove-margin'>{`Posts (${item.length})`}</p>
            <div className='icon-container' onClick={handleClear}><RxReset /></div>
        </div>
    )
}

export default SearchClearWithTitle;