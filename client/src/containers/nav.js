import { useState } from 'react';
import { NavLogo, NavMenu, MobileMenu } from '../components';
const Nav = () => {
    // State to control the mobile menu visibility
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    // Toggle the mobile menu state
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };
    return (<nav className="bg-black text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* Mobile Menu Button - Only visible on mobile */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" aria-controls="mobile-menu" aria-expanded={isMobileMenuOpen ? 'true' : 'false'} // Update the aria-expanded to reflect the state
     onClick={toggleMobileMenu} // Toggle the mobile menu on click
    >
              <span className="sr-only">Open main menu</span>
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>

          {/* Logo Section */}
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <NavLogo />
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:block sm:ml-6">
            <NavMenu />
          </div>
        </div>
      </div>

      {/* Mobile Menu - Only visible when isMobileMenuOpen is true */}
      {isMobileMenuOpen && <MobileMenu />}
    </nav>);
};
export default Nav;
