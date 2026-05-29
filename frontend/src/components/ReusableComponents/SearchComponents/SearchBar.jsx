
import { useState } from "react";
import './Search.css';



/* contains 3 types of search
- search input by string
- optional: reduce search size by selecting a filter
- filter by sort
*/
const SearchBar = ({ search, setSearch, searchPlaceholder, searchArray, setSelectedItem, filterPlaceholder, selectedFilter, setSelectedFilter, filterArray, filterCondition }) => {
    const [showSearchDropdown, setShowSearchDropdown] = useState(false);
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);


    return (
        <div className="content-panel panel-row">
            <div className="search-input-section">
                <input
                    className="search-input-component"
                    value={search}
                    placeholder={searchPlaceholder}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setShowSearchDropdown(true);
                    }}
                    onFocus={() => setShowSearchDropdown(true)}
                    onBlur={() => {
                        setTimeout(() => {
                            setShowSearchDropdown(false);
                        }, 100);
                    }}
                />
                {showSearchDropdown && searchArray.length > 0 && (
                    <div className="search-dropdown">
                        {searchArray.map(item => (
                            <div
                                key={item.id}
                                className="search-dropdown-item"
                                onClick={() => {
                                    setSelectedItem(item);
                                    setShowSearchDropdown(false);
                                }}
                            >
                                {item?.name ? item.name : item.title}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {filterPlaceholder && <div className="search-input-section">
                <div
                    className="search-input-component filter-dropdown-trigger"
                    onClick={() => setShowFilterDropdown(prev => !prev)}
                    onBlur={() => {
                        setTimeout(() => {
                            setShowFilterDropdown(false);
                        }, 100);
                    }}
                    tabIndex={0}
                >
                    {`${selectedFilter ? (selectedFilter?.name || selectedFilter?.title) : filterPlaceholder}`}
                </div>

                {showFilterDropdown && (
                    <div className="search-dropdown">
                        <div
                            className="search-dropdown-item"
                            onClick={() => {
                                setSelectedFilter(null);
                                setShowFilterDropdown(false);
                            }}
                        >
                            {filterPlaceholder}
                        </div>

                        {filterArray.map(item => (
                            <div
                                key={item.id}
                                className="search-dropdown-item"
                                onClick={() => {
                                    setSelectedFilter(item);
                                    setShowFilterDropdown(false);
                                    if (filterCondition) filterCondition(item.id);
                                }}
                            >
                                {item?.name ? item.name : item.title}
                            </div>
                        ))}
                    </div>
                )}
            </div>}
            <input
                className='search-input-component'
                placeholder="Sort: Last Updated"
                disabled={true}
            />
        </div>
    )
}

export default SearchBar;