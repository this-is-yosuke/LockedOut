import { HeaderOverlay, HeaderContent } from "../components";
import { Escape } from '../assets';

const Header = () => {
  return (
    <header
      className="relative w-full h-screen bg-cover bg-center" 
      style={{
        backgroundImage: `url(${Escape})`, // Correctly interpolate the Escape variable
      }}
    >
      {/* Dark Overlay */}
      <HeaderOverlay />
  
      {/* Header Content */}
      <HeaderContent />
    </header>
  );
};

export default Header;