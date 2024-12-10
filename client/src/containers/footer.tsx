import { FooterBottom, FooterSection, SocialMediaIcons } from "../components";
import { Link } from 'react-router-dom';


const Footer = () => {
  return (
    <footer className="bg-stone-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          <FooterSection
            title="About Us"
            content="Experience a thrilling solo virtual escape room that will challenge your mind. Solve puzzles, uncover secrets, and escape before time runs out!"
          />
          <FooterSection
            title="Quick Links"
            content={
              <ul className="space-y-2">
                <li>                <Link to="/" className="text-gray-400 hover:text-white">
                  Home
                </Link></li>
                <li><a href="#rooms" className="text-gray-400 hover:text-white">Rooms</a></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white">
                  Contact
                </Link></li>
                <li><Link to="/faq" className="text-gray-400 hover:text-white">
                  FAQ
                </Link></li>
              </ul>
            }
          />
          <FooterSection
            title="Follow Us"
            content={<SocialMediaIcons />}
          />
          <FooterSection
            title="Contact Us"
            content={
              <div>
                <p className="text-gray-400">Email: info@escaperoom.com</p>
                <p className="text-gray-400">Phone: (123) 456-7890</p>
                <p className="text-gray-400">Location: 123 Escape St, Mystery City</p>
              </div>
            }
          />
        </div>

        <FooterBottom />
      </div>
    </footer>
  );
};

export default Footer;