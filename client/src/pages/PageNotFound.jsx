import { Home, Search, ArrowLeft } from 'lucide-react';

const PageNotFound = () => {
  return (
     <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-500 via-purple-500 to-blue-400">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 opacity-20">
        <div className="w-32 h-32 border-4 border-white rounded-full animate-pulse"></div>
      </div>
      <div className="absolute bottom-20 right-10 opacity-20">
        <div className="w-24 h-24 bg-white rounded-lg rotate-45 animate-bounce"></div>
      </div>
      <div className="absolute top-1/2 left-1/4 opacity-10">
        <svg className="w-40 h-40" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#FFFFFF" d="M43.3,-59.8C54.7,-50.4,61.5,-35.7,65.8,-20.3C70.1,-4.9,71.9,11.1,67.4,25.3C62.9,39.5,52,52,38.8,59.4C25.6,66.8,9.9,69.1,-5.5,66.8C-20.9,64.5,-35.9,57.7,-48.3,48.3C-60.7,38.9,-70.5,27,-74.6,13.2C-78.7,-0.6,-77.1,-16.3,-70.3,-29.9C-63.5,-43.5,-51.5,-55,-38.1,-64.1C-24.7,-73.2,-10,-79.9,3.7,-85.3C17.4,-90.7,31.9,-69.2,43.3,-59.8Z" transform="translate(100 100)" />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center">
          {/* 404 Number */}
          <h1 className="text-9xl md:text-[200px] font-bold text-white mb-4 leading-none drop-shadow-2xl animate-pulse">
            404
          </h1>

          {/* Message */}
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
            Oops! Page Not Found
          </h2>

          <p className="text-lg md:text-xl text-white/90 mb-12 max-w-2xl mx-auto drop-shadow">
            Looks like you've wandered off campus! The page you're looking for doesn't exist or has been moved.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => window.history.back()}
              className="group flex items-center gap-2 px-8 py-4 bg-white text-purple-600 font-semibold rounded-full shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Go Back
            </button>

            <button
              onClick={() => window.location.href = '/'}
              className="group flex items-center gap-2 px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-full border-2 border-white shadow-lg hover:bg-white hover:text-purple-600 transform hover:scale-105 transition-all duration-300"
            >
              <Home className="w-5 h-5" />
              Home
            </button>
          </div>

          {/* Search Suggestion */}
          <div className="mt-12 flex items-center justify-center gap-2 text-white/80">
            <Search className="w-5 h-5" />
            <p className="text-sm">Try searching for what you need from the homepage</p>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-24 md:h-32">
            <path
              fill="#ffffff"
              fillOpacity="0.2"
              d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  )
}


export default PageNotFound
