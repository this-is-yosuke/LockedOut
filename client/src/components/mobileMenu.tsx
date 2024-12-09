import React from 'react';
import { Link } from 'react-router-dom';

const MobileMenu: React.FC = () => {
  return (
    <div className="sm:hidden" id="mobile-menu">
      <div className="space-y-1 px-2 pt-2 pb-3">
        <Link
          to="/"
          className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
        >
          About
        </Link>
        <Link
          to="/services"
          className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
        >
          Services
        </Link>
        <Link
          to="/contact"
          className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
        >
          Contact
        </Link>
      </div>
    </div>
  );
};

export default MobileMenu;