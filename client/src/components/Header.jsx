// UI Only — Navigation header component

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../features/auth/authSlice';

const Header = () => {

  const {user}= useSelector(state=>state.auth)

const dispatch = useDispatch()
const navigate = useNavigate()

  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () =>{
    dispatch(logoutUser())
   navigate("/login")

  }



  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/marketplace', label: 'Marketplace' },
    { path: '/events', label: 'Events' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 via-pink-500 to-cyan-400 flex items-center justify-center">
              <span className="text-white font-bold text-xl">EV</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              EduVerse
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-purple-600'
                    : 'text-slate-600 hover:text-purple-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
           
            

           { user ? ( <>
           <Link to={user.isAdmin ? "/auth/admin":"/auth/myprofile"}
            
              className="px-6 py-2  rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
             Welcome {user.name} !
            
            </Link>
            <button onClick= {()=>handleLogout()}
            
              className="px-6 py-2 bg-gradient-to-r from-red-600 to-pink-500 text-white rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Logout
            </button>
           </>) : ( <Link
              to="/login"
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Login
            </Link>)}



          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 px-4 rounded-lg transition-colors ${
                  isActive(link.path)
                    ? 'bg-purple-50 text-purple-600 font-medium'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
           
           { user ? ( <>
           <Link to={"/myprofile"}
            
              className="px-6 py-2  rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
             Welcome {user.name} !
            
            </Link>
            <button onClick= {()=>handleLogout()}
            
              className="px-6 py-2 bg-gradient-to-r from-red-600 to-pink-500 text-white rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Logout
            </button>
           </>) : ( <Link
              to="/login"
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Login
            </Link>)}
             <button
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block mt-4 mx-4 py-2 text-center bg-red-to-r from-purple-600 to-pink-500 text-white rounded-full font-medium"
            >
              Logout
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
