


const SearchBar = () => {

    return (
        <div className="content-panel panel-row">

            {/* <div className="filter-search-input">
                <input
                    className="all-entries-filter-component"
                    value={search}
                    placeholder="Search entries..."
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
                {showSearchDropdown && searchEntries.length > 0 && (
                    <div className="search-dropdown">
                        {searchEntries.map(entry => (
                            <div
                                key={entry.id}
                                className="search-dropdown-item"
                                onClick={() => {
                                    setSelectedEntry(entry);
                                    setShowSearchDropdown(false);
                                }}
                            >
                                {entry.name}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="filter-search-input">
                <div
                    className="all-entries-filter-component notebook-dropdown-trigger"
                    onClick={() => setShowNotebookDropdown(prev => !prev)}
                    onBlur={() => {
                        setTimeout(() => {
                            setShowNotebookDropdown(false);
                        }, 100);
                    }}
                    tabIndex={0}
                >
                    {`${selectedNotebook ? selectedNotebook.name : "Notebooks: All"}`}
                </div>

                {showNotebookDropdown && (
                    <div className="search-dropdown">
                        <div
                            className="search-dropdown-item"
                            onClick={() => {
                                setSelectedNotebook(null);
                                setShowNotebookDropdown(false);
                            }}
                        >
                            Notebooks: All
                        </div>

                        {Object.values(notebooks).map(notebook => (
                            <div
                                key={notebook.id}
                                className="search-dropdown-item"
                                onClick={() => {
                                    setSelectedNotebook(notebook);
                                    setShowNotebookDropdown(false);
                                    if (selectedEntry.notebook_id !== notebook.id) setSelectedEntry(null);
                                }}
                            >
                                {notebook.name}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <input
                className='all-entries-filter-component'
                placeholder="Sort: Last Updated"
                disabled={true}
            /> */}
        </div>
    )
}

export default SearchBar;