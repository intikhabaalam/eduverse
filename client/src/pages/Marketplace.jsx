// UI Only — Marketplace page

import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import FilterPanel from '../components/FilterPanel';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts} from '../features/products/productSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const Marketplace = () => {

const {allProducts,productLoading,productSuccess,productError,productErrorMessage}=useSelector(state => state.products)
const dispatch = useDispatch()

  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: 'All',
    priceRange: { min: 0, max: 100000 },
    conditions: [],
    sortBy: 'newest',
    search: ''
  });

  const filteredProducts = allProducts.filter((product) => {
    if (filters.category !== 'All' && product.category !== filters.category) {
      return false;
    }

    if (product.price < filters.priceRange.min || product.price > filters.priceRange.max) {
      return false;
    }

    if (filters.conditions.length > 0 && !filters.conditions.includes(product.condition)) {
      return false;
    }

    if (filters.search && !product.title.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }

    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
        return new Date(b.createdAt) - new Date(a.createdAt);
      default:
        return 0;
    }
  });

  useEffect(()=>{

    dispatch(getProducts())

    if(productError && productErrorMessage){
      toast.error(productErrorMessage)
    }

  },[productError,productErrorMessage])

  if(productLoading){
    return(
      <Loader/>
    )

  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
            Marketplace 🛍️
          </h1>
          <p className="text-lg text-slate-600">
            Discover great deals from fellow students
          </p>
        </div>

        <div className="mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                placeholder="Search products..."
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="sm:hidden px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="sticky top-24">
              <FilterPanel
                filters={filters}
                setFilters={setFilters}
                onClose={() => setShowFilters(false)}
              />
            </div>
          </div>

          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-slate-600">
                <span className="font-semibold text-slate-900">{sortedProducts.length}</span> products found
              </p>
            </div>

            {sortedProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {sortedProducts.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>

                <div className="mt-12 flex justify-center items-center space-x-2">
                  <button className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500">
                    Previous
                  </button>
                  {[1, 2, 3].map((page) => (
                    <button
                      key={page}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                        page === 1
                          ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white'
                          : 'border border-slate-300 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500">
                    Next
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <svg className="w-24 h-24 mx-auto mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-bold text-slate-900 mb-2">No products found</h3>
                <p className="text-slate-600 mb-6">Try adjusting your filters</p>
                <button
                  onClick={() => setFilters({
                    category: 'All',
                    priceRange: { min: 0, max: 100000 },
                    conditions: [],
                    sortBy: 'newest',
                    search: ''
                  })}
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full font-medium hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
