import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../contexts'; // Import the useUser hook
import MobileMenu from './mobileMenu'; // Import the MobileMenu component

const NavMenu: React.FC = () => {
  const { user, logout } = useUser(); // Access user and logout from context

  // State for mobile menu open/close
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toggle the mobile menu state
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="relative">
      {/* Desktop menu */}
      <div className="hidden sm:block sm:ml-6">
        <div className="flex space-x-4">
          <Link to="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
            Home
          </Link>
          <a href="/#about" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
            About
          </a>
          <a href="/#try" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
            Try A Room
          </a>

          {!user ? (
            <>
              <Link to="/login" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Login
              </Link>
              <Link to="/register" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Register
              </Link>
            </>
          ) : (
            <>
              {/* Link to user profile page */}
              <Link 
                to={`/user/${user.username}`} // Link to the user's profile page
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Welcome, {user.username}!
              </Link>

              <Link
                to={`/`}
                onClick={logout}
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile menu icon */}
      <div className="sm:hidden flex items-center">
        <button onClick={toggleMobileMenu} className="text-gray-300 hover:text-white focus:outline-none">
          <span className="sr-only">Open main menu</span>
          {/* Hamburger icon */}
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      {/* Mobile menu (conditionally rendered based on isMobileMenuOpen) */}
      {isMobileMenuOpen && <MobileMenu />}
    </div>
  );
};

export default NavMenu;