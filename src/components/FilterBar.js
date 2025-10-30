const FilterBar = ({ filters, onFilterChange }) => {
  const categories = ['All', 'CSE', 'EEE', 'MATLAB'];

  const handleCategoryChange = (category) => {
    onFilterChange({ ...filters, category });
  };

  const handleSearchChange = (event) => {
    onFilterChange({ ...filters, query: event.target.value });
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
