// UI Only — Filter panel for marketplace

import { categories } from '../data/mockProducts';

const FilterPanel = ({ filters, setFilters, onClose }) => {
  const handleCategoryChange = (category) => {
    setFilters({ ...filters, category });
  };

  const handlePriceChange = (e, type) => {
    setFilters({
      ...filters,
      priceRange: {
        ...filters.priceRange,
        [type]: e.target.value
      }
    });
  };

  const handleConditionChange = (condition) => {
    const newConditions = filters.conditions.includes(condition)
      ? filters.conditions.filter(c => c !== condition)
      : [...filters.conditions, condition];
    setFilters({ ...filters, conditions: newConditions });
  };

  const handleSortChange = (e) => {
    setFilters({ ...filters, sortBy: e.target.value });
  };

  const resetFilters = () => {
    setFilters({
      category: 'All',
      priceRange: { min: 0, max: 100000 },
      conditions: [],
      sortBy: 'newest',
      search: ''
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-900">Filters</h2>
        <button
          onClick={onClose}
          className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
          aria-label="Close filters"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            Category
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${
                  filters.category === category
                    ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            Price Range
          </label>
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-slate-500 mb-1">Min Price</label>
              <input
                type="number"
                value={filters.priceRange.min}
                onChange={(e) => handlePriceChange(e, 'min')}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="₹0"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">Max Price</label>
              <input
                type="number"
                value={filters.priceRange.max}
                onChange={(e) => handlePriceChange(e, 'max')}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="₹100000"
              />
            </div>
            <div className="h-2 bg-slate-200 rounded-full relative">
              <div
                className="absolute h-2 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full"
                style={{
                  left: `${(filters.priceRange.min / 100000) * 100}%`,
                  right: `${100 - (filters.priceRange.max / 100000) * 100}%`
                }}
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            Condition
          </label>
          <div className="space-y-2">
            {['Like New', 'Good', 'Fair'].map((condition) => (
              <label key={condition} className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.conditions.includes(condition)}
                  onChange={() => handleConditionChange(condition)}
                  className="w-4 h-4 text-purple-600 border-slate-300 rounded focus:ring-purple-500"
                />
                <span className="ml-3 text-sm text-slate-700 group-hover:text-purple-600 transition-colors">
                  {condition}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            Sort By
          </label>
          <select
            value={filters.sortBy}
            onChange={handleSortChange}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
          >
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>

        <button
          onClick={resetFilters}
          className="w-full py-2 px-4 border-2 border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;
