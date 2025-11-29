// UI Only — Landing page

import { Link } from 'react-router-dom';
import { CircleShape, SquiggleShape, TriangleShape, StarShape } from '../assets/FloatingShape';
import { mockProducts } from '../data/mockProducts';
import { formatPrice } from '../utils/format';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getProducts} from '../features/products/productSlice';

const Landing = () => {
  const {allProducts,productLoading,productSuccess,productError,productErrorMessage}=useSelector(state => state.products)
  const featuredProducts = allProducts.slice(0, 4);

const dispatch = useDispatch()

useEffect(()=>{

  dispatch(getProducts())

},[])

  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-purple-600 via-pink-500 to-cyan-400 overflow-hidden">
        <CircleShape className="absolute top-10 right-10 w-32 h-32 animate-float opacity-80" />
        <SquiggleShape className="absolute bottom-20 left-10 w-40 h-40 animate-float-delay opacity-70" />
        <TriangleShape className="absolute top-1/2 left-1/4 w-24 h-24 animate-float opacity-60" />
        <StarShape className="absolute bottom-10 right-1/4 w-28 h-28 animate-float-delay opacity-70" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
              Buy. Sell. Connect. 🚀
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto font-medium">
              Your campus marketplace & event hub. Find deals, make friends, never miss a beat!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/marketplace"
                className="px-8 py-4 bg-white text-purple-600 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-white/50"
              >
                Explore Marketplace
              </Link>
              <Link
                to="/events"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-purple-600 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-white/50"
              >
                Check Events
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
              Featured Items ✨
            </h2>
            <p className="text-lg text-slate-600">Deals you don't wanna miss!</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/marketplace/${product._id}`}
                className="bg-slate-50 rounded-2xl overflow-hidden hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="aspect-square bg-slate-200 overflow-hidden">
                  <img
                    src={product.itemImage}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-slate-900 mb-1 line-clamp-1">{product.title}</h3>
                  <p className="text-2xl font-black bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                    {formatPrice(product.price)}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/marketplace"
              className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full font-bold hover:shadow-lg hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              View All Products →
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
              How It Works 💡
            </h2>
            <p className="text-lg text-slate-600">Super simple, super fast!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📱</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Browse</h3>
              <p className="text-slate-600">
                Explore products from fellow students or check out upcoming events
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💬</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Connect</h3>
              <p className="text-slate-600">
                Message sellers directly or comment on events you're interested in
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎉</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Enjoy</h3>
              <p className="text-slate-600">
                Get great deals and never miss amazing campus events again!
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
              What Students Say 🗣️
            </h2>
            <p className="text-lg text-slate-600">Real reviews from real students</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Priya S.',
                text: 'Sold my old textbooks in 2 days! Super easy and convenient. Love this platform! 📚',
                avatar: 'PS'
              },
              {
                name: 'Arjun M.',
                text: 'Never miss any college events now. The notification system is perfect! 🔔',
                avatar: 'AM'
              },
              {
                name: 'Sneha R.',
                text: 'Got an amazing deal on a laptop from a senior. Totally legit and safe! 💻',
                avatar: 'SR'
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-slate-50 p-6 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white font-bold mr-3">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{testimonial.name}</p>
                    <div className="flex text-neon-yellow">
                      {'★★★★★'.split('').map((star, i) => (
                        <span key={i}>{star}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-slate-700">{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Ready to Get Started? 🚀
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of students already using CampusPortal!
          </p>
          <Link
            to="/login"
            className="inline-block px-10 py-4 bg-white text-purple-600 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-white/50"
          >
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;
