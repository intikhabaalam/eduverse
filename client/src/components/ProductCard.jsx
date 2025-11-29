// UI Only — Product card component for marketplace

import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/format';
import { useState } from 'react';

const ProductCard = ({ product }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group">
      <Link to={`/marketplace/${product._id}`} className="block relative">
        <div className="aspect-w-4 aspect-h-3 bg-slate-100 overflow-hidden">
          <img
            src={product.itemImage}
            alt={product.title}
            className="w-full h-55 object-cover group-hover:scale-105 transition-transform duration-300" 
          />
        </div>
        <div className="absolute top-3 right-3">
          <button
            
            className="p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
          >
            <svg
              className={`w-5 h-5 ${isBookmarked ? 'fill-red-500' : 'fill-none'} stroke-red-500`}
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold text-slate-700 rounded-full">
           {product.isAvailable?"For Sale":"Sold"}
          </span>
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/`}>
          <h3 className="font-semibold text-slate-900 text-lg mb-1 line-clamp-2 hover:text-purple-600 transition-colors">
            {product.title}
          </h3>
        </Link>
        <p className="text-sm text-slate-500 mb-2 line-clamp-1">
          
        </p>

        <div className="flex items-center justify-between mt-4">
          <div>
            <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
             ₹{product.price}
            </p>
            <p className="text-xs text-slate-500 mt-1">Listed By : {product.user.name}</p>
          </div>
          <div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
