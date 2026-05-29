
import { useState } from "react";



/* contains 3 types of search
- search input by string
- reduce search size by selecting a filter
- filter by sort
*/
const SearchBar = ({ search, setSearch, searchPlaceholder, searchArray, setSelectedItem, filterPlaceholder, selectedFilter, setSelectedFilter, filterArray, filterCondition }) => {
    const [showSearchDropdown, setShowSearchDropdown] = useState(false);

    const [showFilterDropdown, setShowFilterDropdown] = useState(false);


    return (
        <div className="content-panel panel-row">

            <div className="filter-search-input">
                <input
                    className="all-entries-filter-component"
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

            {filterPlaceholder && <div className="filter-search-input">
                <div
                    className="all-entries-filter-component notebook-dropdown-trigger"
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
                                    // if (selectedEntry.notebook_id !== notebook.id) setSelectedEntry(null);
                                }}
                            >
                                {item?.name ? item.name : item.title}
                            </div>
                        ))}
                    </div>
                )}
            </div>}
            <input
                className='all-entries-filter-component'
                placeholder="Sort: Last Updated"
                disabled={true}
            />
        </div>
    )
}

export default SearchBar;