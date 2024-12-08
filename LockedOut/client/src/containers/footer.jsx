import React from 'react'

const Footer = () => {
  return (
    <>
      {/* Footer Section */}
      <footer className="bg-stone-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* About Section */}
            <div>
              <h3 className="text-xl font-semibold mb-4">About Us</h3>
              <p className="text-gray-400">
                We offer thrilling escape room experiences to challenge your mind and test your teamwork. Get ready to solve puzzles, uncover secrets, and escape before time runs out!
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
                <li><a href="#rooms" className="text-gray-400 hover:text-white">Rooms</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-white">Contact</a></li>
                <li><a href="#faq" className="text-gray-400 hover:text-white">FAQ</a></li>
              </ul>
            </div>

            {/* Social Media Links */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2 2l2-2M5 6l2 2l2-2m2 12l2-2l2 2m2-12l2 2l2-2M3 18l2-2l2 2"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12l-7 7l-7-7"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5v14h18V5H3zm6 12l4-4l4 4V7l-4 4l-4-4v10z"></path>
                  </svg>
                </a>
              </div>
            </div>

            {/* Contact Section */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-400">Email: info@escaperoom.com</p>
              <p className="text-gray-400">Phone: (123) 456-7890</p>
              <p className="text-gray-400">Location: 123 Escape St, Mystery City</p>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-gray-700 mt-12 pt-6 text-center">
            <p className="text-gray-400 text-sm">© 2024 Escape Room, Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer;