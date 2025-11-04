const FilterBar = ({
  filters,
  onFilterChange,
  suggestions = [],
  onSuggestionSelect = () => {},
  searchSummary = null,
  subcategories = [],
  onSubcategoryChange = () => {}
}) => {
  const categories = ['All', 'CSE', 'EEE', 'MATLAB'];
  const selectedSubcategory =
    filters.category === 'CSE'
      ? subcategories.find((option) => option.value === filters.subCategory)
      : null;

  const handleCategoryChange = (category) => {
    onFilterChange({
      ...filters,
      category,
      subCategory: category === 'CSE' ? filters.subCategory : ''
    });
  };

  const handleSearchChange = (event) => {
    onFilterChange({ ...filters, query: event.target.value });
  };

  const handleSubcategoryChange = (value) => {
    const normalized = value === filters.subCategory ? '' : value;
    onSubcategoryChange(normalized);
  };

  return (
    <div className="bg-white border-b border-black/10 py-6 mb-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="flex-1">
            <label className="block text-sm font-semibold mb-2" htmlFor="catalog-search">
              Search Projects
            </label>
            <input
              id="catalog-search"
              type="search"
              value={filters.query || ''}
              onChange={handleSearchChange}
              placeholder="Search by title, keywords, or description"
              className="w-full px-4 py-2 border border-black/20 focus:outline-none focus:border-black transition-colors"
            />
            {searchSummary && (searchSummary.query || selectedSubcategory) && (() => {
              let message = '';
              if (searchSummary.query) {
                message =
                  searchSummary.matching > 0
                    ? `Highlighting ${searchSummary.matching} relevant project${
                        searchSummary.matching === 1 ? '' : 's'
                      } out of ${searchSummary.total}.`
                    : `No direct matches yet—showing all ${searchSummary.total} projects sorted by relevance.`;
              } else if (selectedSubcategory) {
                message = `Showing ${searchSummary.total} ${selectedSubcategory.label} project${
                  searchSummary.total === 1 ? '' : 's'
                }.`;
              }
              return message ? <p className="mt-2 text-xs text-gray-500">{message}</p> : null;
            })()}
            {Array.isArray(suggestions) && suggestions.length > 0 && (
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="uppercase text-[10px] tracking-widest text-gray-400">
                  Suggested:
                </span>
                {suggestions.slice(0, 8).map((suggestion) => (
                  <button
                    key={suggestion.label}
                    type="button"
                    onClick={() => onSuggestionSelect(suggestion.label)}
                    className="px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-xs font-medium text-gray-700 transition"
                  >
                    {suggestion.label}
                  </button>
                ))}
              </div>
            )}
            {filters.category === 'CSE' && subcategories.length > 0 && (
              <div className="mt-4">
                <p className="text-xs uppercase tracking-wide text-gray-400 mb-2">
                  CSE Specialisations
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleSubcategoryChange('')}
                    className={`px-3 py-1 rounded-full border text-xs font-medium transition ${
                      !filters.subCategory
                        ? 'bg-black text-white border-black'
                        : 'border-black/30 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    All CSE
                  </button>
                  {subcategories.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleSubcategoryChange(option.value)}
                      className={`px-3 py-1 rounded-full border text-xs font-medium transition ${
                        filters.subCategory === option.value
                          ? 'bg-black text-white border-black'
                          : 'border-black/30 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex-1">
            <h3 className="text-sm font-semibold mb-3">Category / Domain</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat === 'All' ? '' : cat)}
                  className={`px-4 py-2 border transition-all ${
                    filters.category === (cat === 'All' ? '' : cat)
                      ? 'bg-black text-white border-black'
                      : 'border-black/20 text-black hover:bg-gray-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
