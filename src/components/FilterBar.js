import { useState } from 'react';

const FilterBar = ({ filters, onFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState(filters.category);

  const categories = ['All', 'CSE', 'EEE', 'MATLAB'];

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    onFilterChange({ ...filters, category });
  };

  return (
    <div className="bg-white border-b border-black/10 py-6 mb-8">
      <div className="container mx-auto px-4">
        <div>
          {/* Category Filter */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Category / Domain</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat === 'All' ? '' : cat)}
                  className={`px-4 py-2 border transition-all ${
                    selectedCategory === (cat === 'All' ? '' : cat)
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
