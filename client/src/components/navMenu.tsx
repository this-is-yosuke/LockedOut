import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../contexts'; // Import the useUser hook

const MobileMenu: React.FC = () => {
  const { user, logout } = useUser(); // Access user and logout from context

  return (
    <div className="space-y-1 px-2 pt-2 pb-3 sm:hidden" id="mobile-menu">
      <Link
        to="/"
        className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
      >
        Home
      </Link>
      <a
        href="/#about"
        className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
      >
        About
      </a>
      <a
        href="/#try"
        className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
      >
        Try A Room
      </a>

      {/* Conditionally render Login/Register or User's Name and Logout */}
      {!user ? (
        <>
          {/* Show Login and Register if the user is not logged in */}
          <Link
            to="/login"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Register
          </Link>
        </>
      ) : (
        <>
          {/* Link to user's profile page */}
          <Link
            to={`/user/${user.username}`} // Link to the user's profile page
            className="text-gray-300 block px-3 py-2 rounded-md text-base font-medium"
          >
            Welcome, {user.username}!
          </Link>

          <button
            onClick={logout} // Call logout function when clicked
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
};

export default MobileMenu;